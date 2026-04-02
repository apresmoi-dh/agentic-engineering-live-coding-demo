import type { RobotSpec } from '../types/RobotSpec';

const NUMERIC_FIELDS = new Set(['suction_pa', 'runtime_minutes', 'self_sufficient_days']);
const HARDWARE_FIELDS = new Set(['soc', 'ram_gb', 'flash_gb']);

function isKnownValue(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string' && value.startsWith('unknown')) return false;
  return true;
}

export function computeBestInClass(
  specs: RobotSpec[],
  field: string,
  visibleSlugs: Set<string>,
): Set<string> {
  const visible = specs.filter((s) => visibleSlugs.has(s.slug));

  if (NUMERIC_FIELDS.has(field)) {
    const values = visible.map((s) => s[field as keyof RobotSpec] as number);
    const max = Math.max(...values);
    return new Set(visible.filter((s) => (s[field as keyof RobotSpec] as number) === max).map((s) => s.slug));
  }

  if (HARDWARE_FIELDS.has(field)) {
    const someUnknown = visible.some((s) => !isKnownValue(s[field as keyof RobotSpec]));
    if (!someUnknown) return new Set();
    return new Set(
      visible.filter((s) => isKnownValue(s[field as keyof RobotSpec])).map((s) => s.slug),
    );
  }

  return new Set(visible.filter((s) => s.highlight_fields.includes(field)).map((s) => s.slug));
}
