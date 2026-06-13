import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { Artwork } from '../../types';
import { FRAME_STYLE_COLORS } from '../../constants/frameStyles';
import { loadArtworkTexture } from '../../utils/threeUtils';

export function ArtworkMount({ artwork, onFocus }: { artwork: Artwork; onFocus: (id: string) => void }) {
  const texture = loadArtworkTexture(artwork.imageUrl);
  return (
    <group position={[artwork.mountPosition.x, artwork.mountPosition.y, artwork.mountPosition.z]}>
      <mesh onClick={() => onFocus(artwork.id)}>
        <boxGeometry args={[2.45, 1.7, 0.08]} />
        <meshStandardMaterial color={FRAME_STYLE_COLORS[artwork.frameStyle]} roughness={0.45} />
      </mesh>
      <mesh position={[0, 0, 0.055]} onClick={() => onFocus(artwork.id)}>
        <planeGeometry args={[2.18, 1.42]} />
        <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
      </mesh>
      <Html position={[0, -1.08, 0.12]} center>
        <button
          className="border border-black/20 bg-[#fffaf1] px-3 py-1 text-xs text-[#1d1d1b] shadow-line"
          onClick={() => onFocus(artwork.id)}
        >
          {artwork.title}
        </button>
      </Html>
    </group>
  );
}
