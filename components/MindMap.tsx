import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Company, NodeData, LayoutMode } from '../types';
import { GROUP_COLORS, GROUP_LABELS, ORDERED_GROUPS } from '../data';

interface MindMapProps {
  data: Company[];
  onNodeClick: (company: Company) => void;
  selectedId: string | null;
  viewMode: LayoutMode;
  searchQuery: string;
}

const MindMap: React.FC<MindMapProps> = ({ data, onNodeClick, selectedId, viewMode, searchQuery }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [hoveredNode, setHoveredNode] = useState<{ x: number, y: number, company: Company } | null>(null);

  // Maintain persistent nodes ref to allow smooth transitions between layouts
  const nodesRef = useRef<NodeData[]>([]);

  // Initialize nodes whenever DATA changes
  useEffect(() => {
    // Sort companies by group order defined above, then by name
    const sortedCompanies = [...data].sort((a, b) => {
        const groupA = ORDERED_GROUPS.indexOf(a.group);
        const groupB = ORDERED_GROUPS.indexOf(b.group);
        if (groupA !== groupB) return groupA - groupB;
        return a.name.localeCompare(b.name);
    });

    // Reuse existing nodes if IDs match to preserve positions
    const newNodes = sortedCompanies.map(c => {
        const existing = nodesRef.current.find(n => n.id === c.id);
        return {
            ...c,
            x: existing ? existing.x : 0, 
            y: existing ? existing.y : 0,
            radius: c.group === 'core' ? 36 : 26
        };
    });
    
    nodesRef.current = newNodes;
  }, [data]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Main Layout & Simulation Effect ---
  // Depends on layout parameters, but NOT on visual states like selection or search
  useEffect(() => {
    if (!svgRef.current || dimensions.width === 0 || nodesRef.current.length === 0) return;

    const svg = d3.select(svgRef.current);
    
    // Clear previous renders if any (important for switching systems)
    svg.selectAll("*").remove();

    const width = dimensions.width;
    const height = dimensions.height;
    const centerX = width / 2;
    const centerY = height / 2;

    // --- Layout Calculation Engine ---
    const nodes = nodesRef.current;
    
    // Radii definition for Orbit
    const RADII: Record<string, number> = {
        core: 90, 
        secondary: 230, 
        marketing: 360, 
        invest: 490, 
        software: 620
    };

    // Column definition for Matrix
    const colWidth = 160;

    if (viewMode === 'orbit') {
        const nodesByGroup: Record<string, NodeData[]> = {
            core: [], secondary: [], marketing: [], invest: [], software: []
        };
        nodes.forEach(n => nodesByGroup[n.group]?.push(n));
        
        Object.entries(nodesByGroup).forEach(([group, groupNodes]) => {
            const radius = RADII[group] || 300;
            const angleStep = (2 * Math.PI) / groupNodes.length;
            // Shift start angle so they don't look like a straight line
            const startAngle = -Math.PI / 2 + (group === 'secondary' ? 0.5 : 0); 
            groupNodes.forEach((node, i) => {
                const angle = startAngle + (i * angleStep);
                node.targetX = centerX + radius * Math.cos(angle);
                node.targetY = centerY + radius * Math.sin(angle);
            });
        });
    } else if (viewMode === 'galaxy') {
        const spiralNodes = [...nodes].sort((a, b) => {
             return ORDERED_GROUPS.indexOf(a.group) - ORDERED_GROUPS.indexOf(b.group);
        });
        
        const spacing = 45;
        const goldenAngle = Math.PI * (3 - Math.sqrt(5)); 

        spiralNodes.forEach((node, i) => {
            if (node.group === 'core') {
                 const angle = (i * (2 * Math.PI)) / 5;
                 node.targetX = centerX + 60 * Math.cos(angle);
                 node.targetY = centerY + 60 * Math.sin(angle);
            } else {
                 const index = i + 5; 
                 const r = spacing * Math.sqrt(index);
                 const theta = index * goldenAngle;
                 node.targetX = centerX + r * Math.cos(theta);
                 node.targetY = centerY + r * Math.sin(theta);
            }
        });
    } else if (viewMode === 'matrix') {
        // Grid Layout
        nodes.forEach(node => {
            const colIndex = ORDERED_GROUPS.indexOf(node.group);
            const offsetFromCenter = colIndex - 2; // -2, -1, 0, 1, 2
            
            node.targetX = centerX + (offsetFromCenter * colWidth);
            
            const groupNodes = nodes.filter(n => n.group === node.group);
            const indexInGroup = groupNodes.indexOf(node);
            const totalHeight = groupNodes.length * 80;
            const startY = centerY - (totalHeight / 2) + 40;
            
            node.targetY = startY + (indexInGroup * 80);
        });
    }

    // --- Drawing / Rendering ---
    
    // Create new groups since we cleared the SVG
    const defs = svg.append("defs");
    const filter = defs.append("filter")
        .attr("id", "glow")
        .attr("x", "-50%")
        .attr("y", "-50%")
        .attr("width", "200%")
        .attr("height", "200%");
    filter.append("feGaussianBlur").attr("stdDeviation", "3.5").attr("result", "coloredBlur");
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    const g = svg.append("g").attr("class", "main-group");
    
    const zoom = d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.1, 2.5])
        .on("zoom", (event) => g.attr("transform", event.transform));
    
    zoomRef.current = zoom;
    svg.call(zoom);
    
    // Initial Centering
    const initialK = 0.65;
    const initialTx = centerX * (1 - initialK);
    const initialTy = centerY * (1 - initialK);
    svg.call(zoom.transform, d3.zoomIdentity.translate(initialTx, initialTy).scale(initialK));

    // --- Background Layers (Orbit & Matrix) ---

    // 1. Orbit Backgrounds
    const orbitBgGroup = g.append("g").attr("class", "orbit-bg");

    // Prepare data for orbits
    const orbitData = viewMode === 'orbit' ? ORDERED_GROUPS.map(group => ({
        group,
        r: RADII[group],
        color: GROUP_COLORS[group],
        label: GROUP_LABELS[group]
    })) : [];

    const orbits = orbitBgGroup.selectAll("g.orbit-ring").data(orbitData, (d: any) => d.group);
    
    const orbitsEnter = orbits.enter().append("g").attr("class", "orbit-ring").attr("opacity", 0);
    
    // Ring Stroke
    orbitsEnter.append("circle")
        .attr("cx", centerX)
        .attr("cy", centerY)
        .attr("fill", "none")
        .attr("stroke", d => d.color)
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "4,4")
        .attr("r", d => d.r);

    // Ring Fill (Zone)
    orbitsEnter.append("circle")
        .attr("cx", centerX)
        .attr("cy", centerY)
        .attr("fill", d => d.color)
        .attr("fill-opacity", 0.03) // Very subtle tint
        .attr("stroke", "none")
        .attr("r", d => d.r);
    
    // Label
    orbitsEnter.append("text")
        .attr("x", centerX)
        .attr("y", d => centerY - d.r - 8)
        .attr("text-anchor", "middle")
        .attr("fill", d => d.color)
        .attr("font-size", "10px")
        .attr("font-weight", "700")
        .style("text-transform", "uppercase")
        .style("letter-spacing", "2px")
        .text(d => d.label);

    orbitsEnter.transition().duration(1000).attr("opacity", 0.6);
    
    
    // 2. Matrix Backgrounds
    const matrixBgGroup = g.append("g").attr("class", "matrix-bg");

    const matrixData = viewMode === 'matrix' ? ORDERED_GROUPS.map((group, index) => ({
        group,
        x: centerX + ((index - 2) * colWidth),
        color: GROUP_COLORS[group],
        label: GROUP_LABELS[group]
    })) : [];

    const cols = matrixBgGroup.selectAll("g.matrix-col").data(matrixData, (d: any) => d.group);

    const colsEnter = cols.enter().append("g").attr("class", "matrix-col").attr("opacity", 0);

    // Column Background
    colsEnter.append("rect")
        .attr("x", d => d.x - (colWidth/2) + 5)
        .attr("y", centerY - 300) // Arbitrary top
        .attr("width", colWidth - 10)
        .attr("height", 600) // Arbitrary height
        .attr("fill", d => d.color)
        .attr("fill-opacity", 0.05)
        .attr("rx", 8);

    // Column Header
    colsEnter.append("text")
        .attr("x", d => d.x)
        .attr("y", centerY - 320)
        .attr("text-anchor", "middle")
        .attr("fill", d => d.color)
        .attr("font-size", "12px")
        .attr("font-weight", "700")
        .style("text-transform", "uppercase")
        .style("letter-spacing", "1px")
        .text(d => d.label);

    colsEnter.transition().duration(1000).attr("opacity", 1);


    // --- Node Rendering ---
    const nodeGroup = g.append("g").attr("class", "node-layer");

    const nodeSelection = nodeGroup.selectAll<SVGGElement, NodeData>("g.node")
        .data(nodes, d => d.id);

    // ENTER
    const nodeEnter = nodeSelection.enter().append("g")
        .attr("class", "node")
        .attr("cursor", "pointer")
        .attr("opacity", 0)
        .on("click", (event, d) => {
            event.stopPropagation();
            const company = data.find(c => c.id === d.id);
            if (company) onNodeClick(company);
        })
        .on("mouseenter", (event, d) => {
            const company = data.find(c => c.id === d.id);
            if(company) {
                const [x, y] = d3.pointer(event, containerRef.current);
                setHoveredNode({ x, y, company });
            }
            d3.select(event.currentTarget).select("circle.main-circle")
                .transition().duration(200)
                .attr("stroke", "#fff")
                .attr("stroke-width", 4)
                .attr("filter", "url(#glow)");
        })
        .on("mouseleave", (event, d) => {
            setHoveredNode(null);
            // Revert style will be handled by the Update effect if needed, 
            // but for simple hover we can just revert here based on selection state.
            const isSelected = selectedId === d.id; 
            const circle = d3.select(event.currentTarget).select("circle.main-circle");
            if (!isSelected) {
                circle.transition().duration(200)
                    .attr("stroke", "rgba(255,255,255,0.2)")
                    .attr("stroke-width", 2)
                    .attr("filter", null);
            }
        });
    
    // Initial entrance animation
    nodeEnter.transition().duration(1000).attr("opacity", 1);

    nodeEnter.append("circle")
        .attr("class", "main-circle")
        .attr("r", d => d.radius || 20)
        .attr("fill", d => GROUP_COLORS[d.group])
        .attr("stroke", "rgba(255,255,255,0.2)")
        .attr("stroke-width", 2)
        .attr("opacity", 0.9);

    nodeEnter.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", d => (d.group === 'core' ? 6 : 4))
        .attr("fill", "white")
        .attr("font-weight", "800")
        .attr("font-size", d => d.group === 'core' ? "15px" : "11px")
        .attr("pointer-events", "none")
        .style("text-shadow", "0px 2px 4px rgba(0,0,0,0.8)")
        .text(d => d.abbreviation || d.name.substring(0, 3).toUpperCase());

    nodeEnter.append("circle")
        .attr("class", "ring")
        .attr("r", d => (d.radius || 20) + 6)
        .attr("fill", "none")
        .attr("stroke", d => GROUP_COLORS[d.group])
        .attr("stroke-width", 1)
        .attr("opacity", 0.3)
        .attr("stroke-dasharray", "2,2");

    // --- Simulation ---
    const simulation = d3.forceSimulation<NodeData>(nodes)
        .force("x", d3.forceX(d => d.targetX!).strength(viewMode === 'matrix' ? 0.2 : 0.1))
        .force("y", d3.forceY(d => d.targetY!).strength(viewMode === 'matrix' ? 0.2 : 0.1))
        .force("collide", d3.forceCollide(d => (d.radius || 30) + 15).strength(0.8))
        .force("charge", d3.forceManyBody().strength(-30))
        .alpha(1)
        .alphaDecay(0.04);

    const allNodes = nodeEnter.merge(nodeSelection);

    simulation.on("tick", () => {
        nodes.forEach(d => {
            if (d.targetX !== undefined && d.targetY !== undefined) {
                d.x = d.x! + (d.targetX - d.x!) * 0.05;
                d.y = d.y! + (d.targetY - d.y!) * 0.05;
            }
        });
        allNodes.attr("transform", d => `translate(${d.x},${d.y})`);
    });

    return () => {
        simulation.stop();
    };
  }, [dimensions, viewMode, data]); // Removed selectedId and searchQuery from here


  // --- Visual Updates Effect (Selection & Search) ---
  useEffect(() => {
     if (!svgRef.current) return;
     const svg = d3.select(svgRef.current);
     const nodes = svg.selectAll<SVGGElement, NodeData>(".node");
     const query = searchQuery.trim().toLowerCase();

     // 1. Update Styles
     nodes.transition().duration(400)
        .attr("opacity", d => {
            if (selectedId && d.id === selectedId) return 1; // Always show selected
            if (!query && !selectedId) return 1; // Show all if idle

            let match = true;
            if (query) {
                match = d.name.toLowerCase().includes(query) || 
                        d.abbreviation?.toLowerCase().includes(query) ||
                        d.group.toLowerCase().includes(query);
            }
            
            return match ? 1 : 0.1;
        })
        .style("pointer-events", d => {
            if (!query) return "all";
            const match = d.name.toLowerCase().includes(query) || 
                          d.abbreviation?.toLowerCase().includes(query) ||
                          d.group.toLowerCase().includes(query);
            return match ? "all" : "none";
        });

     nodes.select("circle.main-circle")
        .transition().duration(400)
        .attr("stroke", d => d.id === selectedId ? "#fff" : "rgba(255,255,255,0.2)")
        .attr("stroke-width", d => d.id === selectedId ? 4 : 2)
        .attr("filter", d => d.id === selectedId ? "url(#glow)" : null);

     // 2. Zoom Animation (Selection OR Search)
     
     if (selectedId && zoomRef.current && nodesRef.current.length > 0) {
        // Find selected node
        const selectedNode = nodesRef.current.find(d => d.id === selectedId);
        if (selectedNode) {
             const width = dimensions.width;
             const height = dimensions.height;
             const scale = 2.0; // Fixed zoom for single node
             const x = selectedNode.x ?? 0;
             const y = selectedNode.y ?? 0;
             
             // Center calculation
             const tx = width / 2 - x * scale;
             const ty = height / 2 - y * scale;

             svg.transition().duration(1000).call(zoomRef.current.transform, d3.zoomIdentity.translate(tx, ty).scale(scale));
        }

     } else if (query && zoomRef.current && nodesRef.current.length > 0) {
         // Filter match nodes based on current Data refs
         const matchNodes = nodesRef.current.filter(d => 
             d.name.toLowerCase().includes(query) || 
             d.abbreviation?.toLowerCase().includes(query) ||
             d.group.toLowerCase().includes(query)
         );

         if (matchNodes.length > 0) {
             const xVals = matchNodes.map(d => d.x ?? 0);
             const yVals = matchNodes.map(d => d.y ?? 0);
             const minX = Math.min(...xVals);
             const maxX = Math.max(...xVals);
             const minY = Math.min(...yVals);
             const maxY = Math.max(...yVals);

             // Calculate bounding box center and size
             const width = dimensions.width;
             const height = dimensions.height;
             // Ensure at least some width/height if only one node
             const contentW = Math.max(maxX - minX, 150);
             const contentH = Math.max(maxY - minY, 150);
             const cx = (minX + maxX) / 2;
             const cy = (minY + maxY) / 2;

             // Calculate Scale to fit
             const padding = 200;
             const scale = Math.min(
                 2, // Max Zoom
                 Math.min(
                    (width - padding) / contentW,
                    (height - padding) / contentH
                 )
             );

             // Calculate translate to center the selection
             const tx = width / 2 - cx * scale;
             const ty = height / 2 - cy * scale;

             svg.transition().duration(1000).call(zoomRef.current.transform, d3.zoomIdentity.translate(tx, ty).scale(scale));
         }
     } else if (!query && !selectedId && zoomRef.current && dimensions.width > 0) {
         // Reset Zoom
         const centerX = dimensions.width / 2;
         const centerY = dimensions.height / 2;
         const initialK = 0.65;
         const initialTx = centerX * (1 - initialK);
         const initialTy = centerY * (1 - initialK);
         
         svg.transition().duration(1000).call(zoomRef.current.transform, d3.zoomIdentity.translate(initialTx, initialTy).scale(initialK));
     }

  }, [searchQuery, selectedId, dimensions, data]); // Runs on visual state changes

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden bg-transparent">
        <svg ref={svgRef} className="w-full h-full block touch-none" />
        
        {/* Tooltip */}
        {hoveredNode && (
            <div 
                className="absolute z-50 pointer-events-none transform -translate-x-1/2 -translate-y-[130%]"
                style={{ left: hoveredNode.x, top: hoveredNode.y }}
            >
                <div className="bg-slate-900/90 backdrop-blur-md border border-white/10 text-white p-3 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.5)] min-w-[150px]">
                    <div 
                        className="text-[10px] font-bold uppercase tracking-wider mb-1" 
                        style={{ color: GROUP_COLORS[hoveredNode.company.group] }}
                    >
                        {GROUP_LABELS[hoveredNode.company.group] || hoveredNode.company.group}
                    </div>
                    <div className="font-bold text-sm leading-tight">{hoveredNode.company.name}</div>
                    {hoveredNode.company.abbreviation && (
                        <div className="text-slate-400 text-xs mt-1">({hoveredNode.company.abbreviation})</div>
                    )}
                </div>
            </div>
        )}

        {/* View Mode Indicator */}
        <div className="absolute bottom-6 right-6 pointer-events-none">
            {viewMode === 'galaxy' && (
                <div className="bg-slate-900/40 p-4 rounded-xl backdrop-blur-md border border-white/5 text-xs text-slate-300 shadow-xl">
                     <div className="font-bold mb-2 text-slate-100 uppercase tracking-widest text-[10px]">Galaxy View</div>
                     <div className="text-[10px] text-slate-400">Spiral organization based on sector growth</div>
                </div>
            )}
        </div>
    </div>
  );
};

export default MindMap;