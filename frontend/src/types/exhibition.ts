import { ExhibitionStatus } from './enums';
import type { Vector3Tuple } from './room';

export interface Exhibition {
  id: string;
  title: string;
  curator: string;
  description: string;
  coverUrl: string;
  roomIds: string[];
  routePoints: Vector3Tuple[];
  audioGuideUrls?: string[];
  status: ExhibitionStatus;
}
