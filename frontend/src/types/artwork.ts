import { FrameStyle } from './enums';
import type { Vector3Tuple } from './room';

export interface Artwork {
  id: string;
  title: string;
  artistName: string;
  year: number;
  medium: string;
  imageUrl: string;
  thumbnailUrl: string;
  description: string;
  roomId: string;
  mountPosition: Vector3Tuple;
  frameStyle: FrameStyle;
  tags: string[];
}
