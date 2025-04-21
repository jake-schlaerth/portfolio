export interface SliderRanges {
  min: number;
  max: number;
  step: number;
}

export interface SliderRangesConfig {
  distortion: SliderRanges;
  scanline: SliderRanges;
  glitch: SliderRanges;
  colorShift: SliderRanges;
  dotMatrix: SliderRanges;
  chromaticAberration: SliderRanges;
  vignette: SliderRanges;
  horizontalDistortion: SliderRanges;
  tapeNoise: SliderRanges;
  trackingJitter: SliderRanges;
  bloom: SliderRanges;
}

export const sliderRanges: SliderRangesConfig = {
  distortion: { min: 0.1, max: 5, step: 0.1 },
  scanline: { min: 0.1, max: 1, step: 0.1 },
  glitch: { min: 0.1, max: 1, step: 0.1 },
  colorShift: { min: 1, max: 100, step: 1 },
  dotMatrix: { min: 0.1, max: 1, step: 0.1 },
  chromaticAberration: { min: 1, max: 10, step: 1 },
  vignette: { min: 1, max: 100, step: 1 },
  horizontalDistortion: { min: 0.1, max: 1, step: 0.1 },
  tapeNoise: { min: 0.05, max: 0.5, step: 0.05 },
  trackingJitter: { min: 0.1, max: 3, step: 0.1 },
  bloom: { min: 1, max: 100, step: 1 },
};
