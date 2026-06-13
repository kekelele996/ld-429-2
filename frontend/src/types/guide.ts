import type { Vector3Tuple } from './room';

export interface GuideAnnotation {
  id: string;
  artworkId: string;
  position: Vector3Tuple;
  title: string;
  description: string;
  audioUrl?: string;
  order: number;
}
