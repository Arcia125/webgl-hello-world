import { MeshPhongMaterial, PlaneBufferGeometry, Mesh } from 'three';

import { SETTINGS } from './SETTINGS';

export const createPlane = () => {
  const material = new MeshPhongMaterial({
    color: 0x808080,
    dithering: true,
  });

  const geometry = new PlaneBufferGeometry(
    SETTINGS.PLANE_SIZE,
    SETTINGS.PLANE_SIZE
  );

  const mesh = new Mesh(geometry, material);
  mesh.position.set(0, -1, 0);
  mesh.rotation.x = -Math.PI * 0.5;
  mesh.receiveShadow = true;

  return {
    material,
    geometry,
    mesh,
  };
};
