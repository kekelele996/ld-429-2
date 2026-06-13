import type { GalleryRoom } from '../../types';
import { createFloorMaterial, createWallMaterial } from '../../utils/threeUtils';

export function RoomBuilder({ room }: { room: GalleryRoom }) {
  const wallMaterial = createWallMaterial(room.wallColor);
  const floorMaterial = createFloorMaterial(room.floorMaterial);
  const { width, height, depth } = room.size;
  return (
    <group>
      <mesh position={[0, -0.02, 0]} material={floorMaterial}>
        <boxGeometry args={[width, 0.04, depth]} />
      </mesh>
      <mesh position={[0, height / 2, -depth / 2]} material={wallMaterial}>
        <boxGeometry args={[width, height, 0.08]} />
      </mesh>
      <mesh position={[-width / 2, height / 2, 0]} material={wallMaterial}>
        <boxGeometry args={[0.08, height, depth]} />
      </mesh>
      <mesh position={[width / 2, height / 2, 0]} material={wallMaterial}>
        <boxGeometry args={[0.08, height, depth]} />
      </mesh>
      <gridHelper args={[Math.max(width, depth), 12, '#b7472a', '#d7cbb9']} position={[0, 0.02, 0]} />
    </group>
  );
}
