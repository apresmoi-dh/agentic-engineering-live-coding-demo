export interface RobotSpec {
  slug: string;
  brand: string;
  model: string;
  price_usd: number;
  image: string;
  sort_order: number;

  // Local Control
  valetudo_support: boolean;
  valetudo_root_method: string | null;
  valetudo_root_difficulty: string | null;

  // Camera Platform
  camera: boolean;
  camera_resolution: string | null;
  video_stream: boolean;
  speaker: boolean;
  microphone: boolean;

  // Cleaning Autonomy
  suction_pa: number;
  runtime_minutes: number;
  self_sufficient_days: number;
  auto_mop_wash: boolean;
  dirt_detection: boolean;
  multi_floor_mapping: boolean;

  // Hardware
  soc: string | null;
  ram_gb: number | null;
  flash_gb: number | null;

  // Editorial / Display
  verdict_label: string;
  verdict_level: 'best' | 'good' | 'caution' | 'skip';
  highlight_fields: string[];
  camera_display: string | null;
  video_display: string | null;
  soc_display: string | null;
  flash_display: string | null;
}
