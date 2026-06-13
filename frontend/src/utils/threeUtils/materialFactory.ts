import * as THREE from 'three';

export const createWallMaterial = (color: string) =>
  new THREE.MeshStandardMaterial({
    color,
    roughness: 0.82,
    metalness: 0.02,
  });

export const createFloorMaterial = (materialName: string) => {
  const color = materialName.includes('concrete') ? '#aaa294' : materialName.includes('stone') ? '#b9c0bc' : '#9b7656';
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.65,
    metalness: materialName.includes('stone') ? 0.12 : 0.02,
  });
};
