import { VisitorStatus } from './enums';

export interface VisitorLog {
  visitorId: string;
  enteredAt: string;
  staySeconds: number;
  viewedArtworkIds: string[];
  currentRoomId: string;
  onlineStatus: VisitorStatus;
}
