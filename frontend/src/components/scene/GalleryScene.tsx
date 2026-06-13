import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { useArtworkStore } from '../../stores/artworkStore';
import { useGalleryScene } from '../../hooks/useGalleryScene';
import { ArtworkMount } from './ArtworkMount';
import { LightingSetup } from './LightingSetup';
import { NavigationController } from './NavigationController';
import { RoomBuilder } from './RoomBuilder';

export function GalleryScene() {
  const { room, artworks, darkMode } = useGalleryScene();
  const setActiveArtwork = useArtworkStore((state) => state.setActiveArtwork);

  if (!room) return null;

  return (
    <Canvas camera={{ position: [0, 3, 7], fov: 55 }} dpr={[1, 1.6]}>
      <color attach="background" args={[darkMode ? '#171511' : '#f4efe6']} />
      <Suspense fallback={null}>
        <LightingSetup room={room} darkMode={darkMode} />
        <RoomBuilder room={room} />
        {artworks.map((artwork) => (
          <ArtworkMount key={artwork.id} artwork={artwork} onFocus={setActiveArtwork} />
        ))}
        <NavigationController />
      </Suspense>
    </Canvas>
  );
}
