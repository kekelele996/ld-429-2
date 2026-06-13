import * as THREE from 'three';

const loader = new THREE.TextureLoader();

export const loadArtworkTexture = (url: string) => {
  const texture = loader.load(url);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
};
