import { create } from 'zustand';
import type { VisitorLog } from '../types';
import { VisitorStatus } from '../types/enums';
import { visitors } from '../api/mockGallery';

interface VisitorState {
  visitors: VisitorLog[];
  currentVisitorId: string;
  markViewed: (artworkId: string) => void;
  leaveGallery: () => void;
}

export const useVisitorStore = create<VisitorState>((set, get) => ({
  visitors,
  currentVisitorId: 'visitor-local',
  markViewed: (artworkId) => {
    const { currentVisitorId } = get();
    set((state) => {
      const existing = state.visitors.find((visitor) => visitor.visitorId === currentVisitorId);
      if (!existing) {
        return {
          visitors: [
            ...state.visitors,
            {
              visitorId: currentVisitorId,
              enteredAt: new Date().toISOString(),
              staySeconds: 0,
              viewedArtworkIds: [artworkId],
              currentRoomId: 'room-main',
              onlineStatus: VisitorStatus.InGallery,
            },
          ],
        };
      }
      return {
        visitors: state.visitors.map((visitor) =>
          visitor.visitorId === currentVisitorId
            ? {
                ...visitor,
                viewedArtworkIds: Array.from(new Set([artworkId])),
                onlineStatus: VisitorStatus.InGallery,
              }
            : visitor,
        ),
      };
    });
  },
  leaveGallery: () =>
    set((state) => ({
      visitors: state.visitors.map((visitor) =>
        visitor.visitorId === state.currentVisitorId ? { ...visitor, onlineStatus: VisitorStatus.Left } : visitor,
      ),
    })),
}));
