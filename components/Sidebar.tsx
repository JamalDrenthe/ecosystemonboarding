import React, { useState } from 'react';
import { Company } from '../types';
import { GROUP_LABELS, GROUP_COLORS, ORDERED_GROUPS } from '../data';
import { X, Building2, Tag, List, ChevronDown, ChevronRight, Layers } from 'lucide-react';

interface SidebarProps {
  selectedCompany: Company | null;
  companies: Company[];
  onClose: () => void;
  onSelect: (company: Company) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedCompany, companies, onClose, onSelect }) => {
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());

  const toggleGroup = (group: string) => {
    const newCollapsed = new Set(collapsedGroups);
    if (newCollapsed.has(group)) {
        newCollapsed.delete(group);
    } else {
        newCollapsed.add(group);
    }
    setCollapsedGroups(newCollapsed);
  };

  // Helper to check if we should group by levels (heuristically check if many items have "Level" tags)
  const hasLevels = companies.some(c => c.tags?.some(t => t.startsWith('Level')));

  // --- Render Function for Standard Layout (SalesOps, PartnerOps) ---
  const renderStandardLayout = () => {
    return (
        <div className="space-y-6">
            {ORDERED_GROUPS.map(group => {
                    const groupCompanies = companies.filter(c => c.group === group);
                    if (groupCompanies.length === 0) return null;
                    
                    const isCollapsed = collapsedGroups.has(group);

                    return (
                    <div key={group} className="space-y-2">
                        <button 
                            onClick={() => toggleGroup(group)}
                            className="w-full flex items-center gap-2 py-1.5 px-2 -ml-2 rounded-lg hover:bg-white/5 transition-colors group select-none"
                        >
                            {isCollapsed ? (
                                <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 transition-colors" />
                            ) : (
                                <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 transition-colors" />
                            )}
                            
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: GROUP_COLORS[group] }}></div>
                            
                            <h3 className="text-xs font-bold uppercase tracking-widest flex-1 text-left" style={{ color: GROUP_COLORS[group] }}>
                                {GROUP_LABELS[group]}
                            </h3>
                            
                            <span className="text-[10px] text-slate-600 font-mono bg-white/5 px-1.5 rounded border border-white/5">
                                {groupCompanies.length}
                            </span>
                        </button>

                        {!isCollapsed && (
                            <div className="pl-2 pt-1 grid gap-2">
                                {groupCompanies.map(company => (
                                    <button 
                                        key={company.id}
                                        onClick={() => onSelect(company)}
                                        className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-transparent hover:border-white/10 text-left group w-full"
                                    >
                                        <span className="text-sm text-slate-300 font-medium group-hover:text-white transition-colors">
                                            {company.name}
                                        </span>
                                        {company.abbreviation && (
                                            <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded border border-white/5">
                                                {company.abbreviation}
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    );
            })}
        </div>
    );
  };

  // --- Render Function for Level Layout (OnboardingOps) ---
  const renderLevelLayout = () => {
    // 1. Group companies by their Level tag
    const levels: Record<string, Company[]> = {};
    const noLevel: Company[] = [];

    companies.forEach(c => {
        const levelTag = c.tags?.find(t => t.startsWith('Level'));
        if (levelTag) {
            if (!levels[levelTag]) levels[levelTag] = [];
            levels[levelTag].push(c);
        } else {
            noLevel.push(c);
        }
    });

    // 2. Sort Level Keys based on numeric value (Level 1, Level 2...) 
    // AND tie-break using the index in the original array to preserve strict prompt order (e.g. for split levels like Level 8)
    const sortedLevelKeys = Object.keys(levels).sort((a, b) => {
        // Extract number
        const getNum = (str: string) => parseInt(str.match(/Level\s+(\d+)/i)?.[1] || '0');
        const numA = getNum(a);
        const numB = getNum(b);
        
        if (numA !== numB) return numA - numB;
        
        // Tie-breaker: Use index of the first item in this group from the source array
        // This ensures "Level 8 (Werk)" comes before "Level 8 (Factor)" if defined that way in data.ts
        const indexA = companies.indexOf(levels[a][0]);
        const indexB = companies.indexOf(levels[b][0]);
        return indexA - indexB;
    });

    return (
        <div className="space-y-6">
            {sortedLevelKeys.map(levelKey => {
                const isCollapsed = collapsedGroups.has(levelKey);
                
                return (
                    <div key={levelKey} className="space-y-1">
                        <button 
                             onClick={() => toggleGroup(levelKey)}
                             className="w-full flex items-center gap-2 py-2 px-1 border-b border-white/5 hover:bg-white/5 transition-colors group select-none mb-2"
                        >
                             {isCollapsed ? (
                                <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 transition-colors" />
                            ) : (
                                <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 transition-colors" />
                            )}
                            <h4 className="text-[11px] uppercase font-bold text-slate-400 tracking-widest text-left flex-1">
                                {levelKey}
                            </h4>
                        </button>

                        {!isCollapsed && (
                             <div className="grid gap-2 pl-2">
                                {levels[levelKey].map(company => (
                                    <button 
                                        key={company.id}
                                        onClick={() => onSelect(company)}
                                        className="flex items-center gap-3 p-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-transparent hover:border-white/10 text-left group w-full"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full flex-none" style={{ backgroundColor: GROUP_COLORS[company.group] }}></div>
                                        <span className="text-sm text-slate-300 font-medium group-hover:text-white transition-colors">
                                            {company.name}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
             {noLevel.length > 0 && (
                <div className="space-y-1 mt-4">
                     <h4 className="text-[10px] uppercase font-bold text-slate-500 tracking-widest pl-1 py-1 border-b border-white/5 mb-2">Other</h4>
                     <div className="grid gap-2">
                        {noLevel.map(company => (
                             <button 
                                key={company.id}
                                onClick={() => onSelect(company)}
                                className="flex items-center gap-3 p-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-transparent hover:border-white/10 text-left group w-full"
                            >
                                <div className="w-1.5 h-1.5 rounded-full flex-none" style={{ backgroundColor: GROUP_COLORS[company.group] }}></div>
                                <span className="text-sm text-slate-300 font-medium group-hover:text-white transition-colors">
                                    {company.name}
                                </span>
                            </button>
                        ))}
                     </div>
                </div>
            )}
        </div>
    );
  };
  
  if (!selectedCompany) {
    return (
        <div className="h-full flex flex-col bg-slate-900/95 backdrop-blur-xl border-l border-white/5 shadow-2xl">
             {/* Header */}
            <div className="flex-none p-6 border-b border-white/5">
                <div className="flex items-center justify-between">
                    <h2 className="text-sm font-bold tracking-wider text-slate-400 uppercase flex items-center gap-2">
                        <List className="w-4 h-4" />
                        Directory
                    </h2>
                    <button onClick={onClose} className="p-2 -mr-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Directory Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                 {hasLevels ? renderLevelLayout() : renderStandardLayout()}
            </div>
        </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-slate-900/95 backdrop-blur-xl border-l border-white/5 shadow-2xl">
      {/* Header */}
      <div className="flex-none p-6 border-b border-white/5">
        <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold tracking-wider text-slate-400 uppercase flex items-center gap-2">
                Entity Data
            </h2>
            <button onClick={onClose} className="p-2 -mr-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar relative bg-gradient-to-b from-transparent to-slate-950/30">
        <div className="p-6 space-y-8">
            {/* Header Info */}
            <div className="relative">
                 <div className="absolute -left-6 top-0 w-1 h-full rounded-r-full" style={{ backgroundColor: GROUP_COLORS[selectedCompany.group] }}></div>
                 <button 
                    onClick={() => onSelect(null as any)} // Handled by parent to reset selection
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider mb-3 text-white/90 border border-white/10 hover:bg-white/5 transition-colors cursor-pointer"
                    style={{ backgroundColor: `${GROUP_COLORS[selectedCompany.group]}30`, borderColor: `${GROUP_COLORS[selectedCompany.group]}40` }}
                >
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: GROUP_COLORS[selectedCompany.group] }}></span>
                    {GROUP_LABELS[selectedCompany.group]}
                </button>
                <h1 className="text-3xl font-bold text-white mb-1 tracking-tight">{selectedCompany.name}</h1>
                {selectedCompany.abbreviation && (
                    <p className="text-slate-400 font-mono text-sm tracking-wide opacity-70">{selectedCompany.abbreviation}</p>
                )}
            </div>

            {/* Static Info Section */}
            <div className="bg-white/5 rounded-2xl border border-white/5 overflow-hidden">
                <div className="p-5 border-b border-white/5 bg-white/[0.02]">
                    <h3 className="font-medium text-slate-200 flex items-center gap-2 text-sm">
                        <Building2 className="w-4 h-4 text-emerald-400" />
                        Company Overview
                    </h3>
                </div>
                <div className="p-5 space-y-4">
                    {selectedCompany.description ? (
                         <p className="text-slate-300 text-sm leading-relaxed">
                            {selectedCompany.description}
                         </p>
                    ) : (
                        <p className="text-slate-500 text-sm italic">
                            No detailed description available for this entity.
                        </p>
                    )}

                    {selectedCompany.tags && selectedCompany.tags.length > 0 && (
                        <div className="pt-2">
                            <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <Tag className="w-3 h-3" /> Categories
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {selectedCompany.tags.map((tag, i) => (
                                    <span key={i} className="px-2.5 py-1 bg-slate-800 text-slate-300 text-xs rounded-md border border-white/5">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            <button 
                onClick={() => onSelect(null as any)} 
                className="w-full py-3 text-xs text-slate-500 hover:text-white transition-colors border-t border-white/5 mt-4"
            >
                ← Back to Directory
            </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;