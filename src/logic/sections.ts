import type { RobotSpec } from '../types/RobotSpec';
import { formatSuction, formatRuntime, formatDays, formatRam, formatFlash, formatSoc } from './formatters';

export type TagVariant = 'success' | 'danger' | 'warning' | 'pink' | 'neutral';

export interface CellValue {
  text: string;
  tag?: TagVariant;
  inlineStyle?: Record<string, string>;
}

export interface RowDef {
  label: string;
  field: string;
  getCell: (spec: RobotSpec) => CellValue;
}

export interface SectionDef {
  title: string;
  iconPath: string;
  rows: RowDef[];
}

export const SECTIONS: SectionDef[] = [
  {
    title: 'Local Control',
    iconPath: 'M8 2a6 6 0 100 12A6 6 0 008 2zm0 1.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9zm0 2a2.5 2.5 0 100 5 2.5 2.5 0 000-5z',
    rows: [
      {
        label: 'Valetudo',
        field: 'valetudo_support',
        getCell: (spec) =>
          spec.valetudo_support
            ? { text: 'Supported', tag: 'success' }
            : { text: 'No', tag: 'danger' },
      },
      {
        label: 'Root method',
        field: 'valetudo_root_method',
        getCell: (spec) => {
          const method = spec.valetudo_root_method;
          if (method === null) return { text: 'None', tag: 'danger' };
          if (method === 'ADB') return { text: 'ADB', tag: 'pink' };
          return { text: method, tag: 'neutral' };
        },
      },
      {
        label: 'Root difficulty',
        field: 'valetudo_root_difficulty',
        getCell: (spec) => {
          const difficulty = spec.valetudo_root_difficulty;
          if (difficulty === null) return { text: '\u2014' };
          return { text: difficulty, tag: 'success' };
        },
      },
    ],
  },
  {
    title: 'Camera Platform',
    iconPath:
      'M1.5 5A1.5 1.5 0 013 3.5h.379l.862-1.724A.5.5 0 014.69 1.5h6.618a.5.5 0 01.447.276L12.621 3.5H13A1.5 1.5 0 0114.5 5v7A1.5 1.5 0 0113 13.5H3A1.5 1.5 0 011.5 12V5zm6.5 6a3 3 0 100-6 3 3 0 000 6zm0-1.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z',
    rows: [
      {
        label: 'Camera type',
        field: 'camera_resolution',
        getCell: (spec) => {
          const display = spec.camera_display;
          if (!display) return { text: '\u2014' };
          if (display === 'Nav only') return { text: display, tag: 'warning' };
          if (display === 'Cloud locked') return { text: display, tag: 'warning' };
          if (display === 'FHD + Infrared') return { text: display, tag: 'pink' };
          if (display === 'RGB') return { text: display, tag: 'neutral' };
          if (display === '8 MP OV8856') return { text: display, tag: 'pink' };
          return { text: display, tag: 'neutral' };
        },
      },
      {
        label: 'Video stream',
        field: 'video_stream',
        getCell: (spec) => {
          if (spec.video_display) return { text: spec.video_display, tag: 'warning' };
          return spec.video_stream
            ? { text: 'Local', tag: 'success' }
            : { text: 'No', tag: 'danger' };
        },
      },
      {
        label: 'Speaker',
        field: 'speaker',
        getCell: (spec) =>
          spec.speaker
            ? { text: 'Yes', tag: 'success' }
            : { text: 'No', tag: 'danger' },
      },
      {
        label: 'Microphone',
        field: 'microphone',
        getCell: (spec) =>
          spec.microphone
            ? { text: 'Yes', tag: 'success' }
            : { text: 'No', tag: 'danger' },
      },
    ],
  },
  {
    title: 'Cleaning Autonomy',
    iconPath:
      'M13.5 8A5.5 5.5 0 112.5 8a5.5 5.5 0 0111 0zM8 4.25v4l2.5 1.5-.75 1.25L7 9.25V4.25H8z',
    rows: [
      {
        label: 'Suction power',
        field: 'suction_pa',
        getCell: (spec) => ({ text: formatSuction(spec.suction_pa) }),
      },
      {
        label: 'Runtime',
        field: 'runtime_minutes',
        getCell: (spec) => ({ text: formatRuntime(spec.runtime_minutes) }),
      },
      {
        label: 'Dust bag',
        field: 'self_sufficient_days',
        getCell: (spec) => ({ text: formatDays(spec.self_sufficient_days) }),
      },
      {
        label: 'Auto mop wash',
        field: 'auto_mop_wash',
        getCell: (spec) =>
          spec.auto_mop_wash
            ? { text: 'Yes', tag: 'success' }
            : { text: 'No', tag: 'danger' },
      },
      {
        label: 'Dirt detection',
        field: 'dirt_detection',
        getCell: (spec) =>
          spec.dirt_detection
            ? { text: 'Yes', tag: 'success' }
            : { text: 'No', tag: 'danger' },
      },
      {
        label: 'Multi-floor maps',
        field: 'multi_floor_mapping',
        getCell: (spec) =>
          spec.multi_floor_mapping
            ? { text: 'Yes', tag: 'success' }
            : { text: 'No', tag: 'danger' },
      },
    ],
  },
  {
    title: 'Hardware',
    iconPath:
      'M5.5 1h5a.5.5 0 01.5.5V3h1a1 1 0 011 1v7a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1h1V1.5a.5.5 0 01.5-.5zM6 3h4V2H6v1zm-2 1v7h8V4H4zm2 1h4v1H6V5zm0 2h4v1H6V7zm0 2h2v1H6V9z',
    rows: [
      {
        label: 'SoC',
        field: 'soc',
        getCell: (spec) => {
          const text = formatSoc(spec);
          const isUnknown =
            spec.soc === null ||
            (spec.soc !== null && spec.soc.startsWith('unknown'));
          if (isUnknown) {
            return {
              text,
              inlineStyle: {
                font: 'var(--cp-text-body-small)',
                color: 'var(--cp-color-jacaranda-grey-50)',
              },
            };
          }
          return {
            text,
            inlineStyle: { font: 'var(--cp-text-body-small)' },
          };
        },
      },
      {
        label: 'RAM',
        field: 'ram_gb',
        getCell: (spec) => ({ text: formatRam(spec.ram_gb) }),
      },
      {
        label: 'Flash',
        field: 'flash_gb',
        getCell: (spec) => ({ text: formatFlash(spec) }),
      },
    ],
  },
];
