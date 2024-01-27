export const scaleSineWave = (amplitude: number, oscillator: number) =>
  (amplitude * (Math.sin(oscillator) + 1)) / 2;
