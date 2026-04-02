---
brand: Roborock
model: Qrevo MaxV
price_usd: 699.99
sort_order: 2
verdict_label: "Cloud Only"
verdict_level: skip
highlight_fields: []
camera_display: "Cloud locked"
video_display: "Cloud only"
soc_display: null
flash_display: null

# Local Control
valetudo_support: false
valetudo_root_method: null
valetudo_root_difficulty: null

# Mobile Camera Platform
camera: true
camera_resolution: unknown
video_stream: true
speaker: true
microphone: true

# Cleaning Autonomy
suction_pa: 7000
runtime_minutes: 180
self_sufficient_days: 49
auto_mop_wash: true
dirt_detection: true
multi_floor_mapping: true

# Hardware
soc: null
ram_gb: null
flash_gb: null
image: https://us.roborock.com/cdn/shop/files/S8_MaxV_Ultra_Black_ID.png
---

# Roborock Qrevo MaxV

![Roborock Qrevo MaxV](https://us.roborock.com/cdn/shop/files/S8_MaxV_Ultra_Black_ID.png)

Good cleaning robot, but **no Valetudo support**. All control goes through Roborock's cloud. This makes it unsuitable as a locally-controlled camera platform — you can't stream the camera feed without their servers.

## Why Not This One

- **No Valetudo.** Full stop for local control.
- Camera exists but is **cloud-locked** — no way to get a local video stream without Roborock's infrastructure.
- 7,000 Pa suction is the weakest here.
- 49-day dust bag is shortest.

## If You Don't Care About Local Control

It's actually a solid robot: mature Roborock app, "Hello Rocky" built-in voice assistant, FlexiArm mop extension, good obstacle avoidance. The [go2rtc project](https://github.com/AlexxIT/go2rtc/blob/master/internal/roborock/README.md) has some Roborock camera integration but it's limited and cloud-dependent.

## Sources

- [Official page](https://us.roborock.com/products/roborock-qrevo-maxv)
- [go2rtc Roborock docs](https://github.com/AlexxIT/go2rtc/blob/master/internal/roborock/README.md)
