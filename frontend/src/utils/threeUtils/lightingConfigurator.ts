import type { LightingConfig } from '../../types';

export const kelvinToLightColor = (kelvin: number) => {
  if (kelvin < 3800) return '#ffd7a1';
  if (kelvin > 5000) return '#d7e7ff';
  return '#fff3dc';
};

export const ambientIntensity = (lighting: LightingConfig, darkMode: boolean) =>
  Math.max(0.25, lighting.brightness * (darkMode ? 0.42 : 0.58));
