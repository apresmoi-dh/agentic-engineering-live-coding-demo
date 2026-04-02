import { parse } from 'yaml';
import type { RobotSpec } from '../types/RobotSpec';

export function loadSpecs(): RobotSpec[] {
  const specs = import.meta.glob('./specs/*.md', {
    eager: true,
    query: '?raw',
    import: 'default',
  }) as Record<string, string>;

  const robots: RobotSpec[] = [];

  for (const [path, raw] of Object.entries(specs)) {
    // Extract slug from filename (e.g., "./specs/dreame_x40_ultra.md" -> "dreame_x40_ultra")
    const slug = path.split('/').pop()?.replace('.md', '') || '';

    // Extract YAML frontmatter
    const match = (raw as string).match(/^---\n([\s\S]*?)\n---/);
    if (!match) continue;

    const frontmatterString = match[1];
    const frontmatter = parse(frontmatterString) as Record<string, unknown>;

    const spec: RobotSpec = {
      slug,
      brand: String(frontmatter.brand || ''),
      model: String(frontmatter.model || ''),
      price_usd: Number(frontmatter.price_usd || 0),
      image: String(frontmatter.image || ''),
      sort_order: Number(frontmatter.sort_order || 999),

      // Local Control
      valetudo_support: Boolean(frontmatter.valetudo_support || false),
      valetudo_root_method: (frontmatter.valetudo_root_method as string | null) || null,
      valetudo_root_difficulty:
        (frontmatter.valetudo_root_difficulty as string | null) || null,

      // Camera Platform
      camera: Boolean(frontmatter.camera || false),
      camera_resolution: (frontmatter.camera_resolution as string | null) || null,
      video_stream: Boolean(frontmatter.video_stream || false),
      speaker: Boolean(frontmatter.speaker || false),
      microphone: Boolean(frontmatter.microphone || false),

      // Cleaning Autonomy
      suction_pa: Number(frontmatter.suction_pa || 0),
      runtime_minutes: Number(frontmatter.runtime_minutes || 0),
      self_sufficient_days: Number(frontmatter.self_sufficient_days || 0),
      auto_mop_wash: Boolean(frontmatter.auto_mop_wash || false),
      dirt_detection: Boolean(frontmatter.dirt_detection || false),
      multi_floor_mapping: Boolean(frontmatter.multi_floor_mapping || false),

      // Hardware
      soc: (frontmatter.soc as string | null) || null,
      ram_gb: (frontmatter.ram_gb as number | null) || null,
      flash_gb: (frontmatter.flash_gb as number | null) || null,

      // Editorial / Display
      verdict_label: String(frontmatter.verdict_label || ''),
      verdict_level: (frontmatter.verdict_level as
        | 'best'
        | 'good'
        | 'caution'
        | 'skip') || ('good' as const),
      highlight_fields: Array.isArray(frontmatter.highlight_fields)
        ? (frontmatter.highlight_fields as string[])
        : [],
      camera_display: (frontmatter.camera_display as string | null) || null,
      video_display: (frontmatter.video_display as string | null) || null,
      soc_display: (frontmatter.soc_display as string | null) || null,
      flash_display: (frontmatter.flash_display as string | null) || null,
    };

    robots.push(spec);
  }

  // Sort by sort_order ascending
  robots.sort((a, b) => a.sort_order - b.sort_order);

  return robots;
}
