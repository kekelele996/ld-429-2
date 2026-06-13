import { RoomType } from '../types/enums';
import type { LightingConfig } from '../types/room';

export const DEFAULT_LIGHTING: Record<RoomType, LightingConfig> = {
  [RoomType.Main]: {
    brightness: 1.15,
    colorTemperature: 4200,
    spotlights: [
      { position: { x: -4, y: 4, z: -3 }, target: { x: -4, y: 2, z: -6 }, intensity: 1.2 },
      { position: { x: 4, y: 4, z: -3 }, target: { x: 4, y: 2, z: -6 }, intensity: 1.2 },
    ],
  },
  [RoomType.Side]: {
    brightness: 0.95,
    colorTemperature: 3600,
    spotlights: [{ position: { x: 0, y: 4, z: -4 }, target: { x: 0, y: 2, z: -6 }, intensity: 1 }],
  },
  [RoomType.Virtual]: {
    brightness: 1.25,
    colorTemperature: 5000,
    spotlights: [{ position: { x: 0, y: 5, z: -1 }, target: { x: 0, y: 2, z: -6 }, intensity: 1.4 }],
  },
  [RoomType.Outdoor]: {
    brightness: 1.4,
    colorTemperature: 5600,
    spotlights: [],
  },
};
