import { RoomType } from './enums';

export interface Vector3Tuple {
  x: number;
  y: number;
  z: number;
}

export interface SpotlightConfig {
  position: Vector3Tuple;
  target: Vector3Tuple;
  intensity: number;
}

export interface LightingConfig {
  brightness: number;
  colorTemperature: number;
  spotlights: SpotlightConfig[];
}

export interface ArtworkMountPoint {
  id: string;
  position: Vector3Tuple;
  rotationY: number;
  width: number;
  height: number;
}

export interface GalleryRoom {
  id: string;
  name: string;
  size: {
    width: number;
    height: number;
    depth: number;
  };
  wallColor: string;
  floorMaterial: string;
  lighting: LightingConfig;
  mountPoints: ArtworkMountPoint[];
  roomType: RoomType;
}
