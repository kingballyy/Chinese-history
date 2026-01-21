export interface Dynasty {
  id: string;
  name: string;
  startYear: number;
  endYear: number;
  color: string;
  description: string;
  capital?: string;
}

export interface Territory {
  id: string; // Unique ID for lookups
  name: string;
  path: string; // SVG path data
  color: string;
  centerX: number;
  centerY: number;
}

export type RelationshipType = 'war' | 'alliance' | 'vassal' | 'peace';

export interface Relationship {
  sourceId: string;
  targetId: string;
  type: RelationshipType;
  startYear: number;
  endYear: number;
  description?: string;
}

export interface MapState {
  label: string;
  territories: Territory[];
  relationships: Relationship[];
}

export interface HistoricalEvent {
  year: number;
  title: string;
  description: string;
  details: string; // Full detailed description
  impact: string; // Historical impact
  location?: { x: number; y: number }; // Map coordinates
}

export interface FactionDetail {
  id: string;
  name: string;
  duration: string;
  rulers: string;
  culture: string;
  events: string;
  impact: string;
}