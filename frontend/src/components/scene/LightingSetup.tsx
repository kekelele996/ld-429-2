import { SpotLight } from '@react-three/drei';
import type { GalleryRoom } from '../../types';
import { ambientIntensity, kelvinToLightColor } from '../../utils/threeUtils';

export function LightingSetup({ room, darkMode }: { room: GalleryRoom; darkMode: boolean }) {
  const color = kelvinToLightColor(room.lighting.colorTemperature);
  return (
    <>
      <ambientLight intensity={ambientIntensity(room.lighting, darkMode)} color={color} />
      <directionalLight position={[0, 7, 5]} intensity={room.lighting.brightness * 0.7} color={color} />
      {room.lighting.spotlights.map((spot, index) => (
        <SpotLight
          key={`${spot.position.x}-${index}`}
          position={[spot.position.x, spot.position.y, spot.position.z]}
          target-position={[spot.target.x, spot.target.y, spot.target.z]}
          intensity={spot.intensity}
          angle={0.48}
          penumbra={0.6}
          color={color}
          distance={10}
        />
      ))}
    </>
  );
}
