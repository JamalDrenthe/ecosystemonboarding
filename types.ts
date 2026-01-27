import { SimulationNodeDatum, SimulationLinkDatum } from 'd3';

export type GroupType = 'core' | 'secondary' | 'marketing' | 'invest' | 'software';

export type LayoutMode = 'orbit' | 'galaxy' | 'matrix';

export type SystemType = 'sales' | 'onboarding';

export interface Company {
  id: string;
  name: string;
  abbreviation?: string;
  group: GroupType;
  description?: string;
  tags?: string[];
}

export interface NodeData extends SimulationNodeDatum {
  id: string;
  group: GroupType;
  name: string;
  abbreviation?: string;
  radius?: number;
  targetX?: number;
  targetY?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface LinkData extends SimulationLinkDatum<NodeData> {
  source: string | NodeData;
  target: string | NodeData;
  value: number;
}

export interface AISimulationResult {
  description: string;
  services: string[];
  synergies: string[];
}