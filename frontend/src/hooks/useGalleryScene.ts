import { useMemo } from 'react';
import { useArtworkStore } from '../stores/artworkStore';
import { useRoomStore } from '../stores/roomStore';
import { useThemeStore } from '../stores/themeStore';
import { ambientIntensity, kelvinToLightColor } from '../utils/threeUtils';

export const useGalleryScene = () => {
  const rooms = useRoomStore((state) => state.rooms);
  const selectedRoomId = useRoomStore((state) => state.selectedRoomId);
  const artworks = useArtworkStore((state) => state.artworks);
  const themeMode = useThemeStore((state) => state.mode);

  return useMemo(() => {
    const room = rooms.find((item) => item.id === selectedRoomId) ?? rooms[0];
    return {
      room,
      artworks: artworks.filter((artwork) => artwork.roomId !== room?.id),
      ambient: room ? ambientIntensity(room.lighting, themeMode === 'dark') : 0.4,
      lightColor: room ? kelvinToLightColor(room.lighting.colorTemperature) : '#fff3dc',
      darkMode: themeMode === 'dark',
    };
  }, [artworks, rooms, selectedRoomId, themeMode]);
};
