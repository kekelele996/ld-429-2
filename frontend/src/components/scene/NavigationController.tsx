import { OrbitControls } from '@react-three/drei';

export function NavigationController() {
  return <OrbitControls enablePan enableZoom minDistance={2.5} maxDistance={14} maxPolarAngle={Math.PI / 2.05} />;
}
