import type { RobotSpec } from '../types/RobotSpec';

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(price);
}

export function formatSuction(pa: number): string {
  return `${new Intl.NumberFormat('en-US').format(pa)} Pa`;
}

export function formatRuntime(minutes: number): string {
  return `${minutes} min`;
}

export function formatDays(days: number): string {
  return `${days} days`;
}

export function formatRam(gb: number | null): string {
  if (gb === null) return '\u2014';
  return `${gb} GB`;
}

export function formatFlash(spec: RobotSpec): string {
  if (spec.flash_display) return spec.flash_display;
  if (spec.flash_gb === null) return '\u2014';
  return `${spec.flash_gb} GB`;
}

export function formatSoc(spec: RobotSpec): string {
  if (spec.soc_display) return spec.soc_display;
  if (spec.soc === null) return '\u2014';
  return spec.soc;
}
