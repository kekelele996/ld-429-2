import { useEffect } from 'react';
import { useVisitorStore } from '../stores/visitorStore';

export const useVisitorTracking = (artworkId?: string) => {
  const markViewed = useVisitorStore((state) => state.markViewed);

  useEffect(() => {
    if (artworkId) markViewed(artworkId);
  }, [artworkId, markViewed]);
};
