import { PerspectiveCamera } from 'three';

export const createCamera = () => {
  const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1
  );
  camera.position.set(
    170.19419412006138,
    138.38052870569922,
    183.04975848916706
  );
  camera.rotation.set(
    -0.647312372951345,
    0.6381579326280384,
    0.42314114614066933
  );
  return camera;
};
