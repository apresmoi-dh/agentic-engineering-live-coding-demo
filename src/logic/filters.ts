import type { RobotSpec } from '../types/RobotSpec';

export interface FilterDef {
  key: string;
  label: string;
  predicate: (spec: RobotSpec) => boolean;
}

export const FILTERS: FilterDef[] = [
  { key: 'valetudo', label: 'Valetudo (local control)', predicate: (s) => s.valetudo_support },
  { key: 'video',    label: 'Video stream',             predicate: (s) => s.video_stream },
  { key: 'mic',      label: 'Speaker + Mic',            predicate: (s) => s.speaker && s.microphone },
  { key: 'dirt',     label: 'Dirt detection',           predicate: (s) => s.dirt_detection },
  { key: 'under800', label: 'Under $800',               predicate: (s) => s.price_usd < 800 },
];
