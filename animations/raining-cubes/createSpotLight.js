import { SpotLight } from 'three';

import { SETTINGS } from './SETTINGS';

export const createSpotLight = () => {
  const spotLight = new SpotLight(0xffffff, 1);
  spotLight.position.set(50, 200, -200);
  spotLight.angle = Math.PI / 4;
  spotLight.penumbra = 0.05;
  spotLight.decay = 2;
  spotLight.distance = SETTINGS.PLANE_SIZE * 2;
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;
  spotLight.shadow.camera.near = 10;
  spotLight.shadow.camera.far = SETTINGS.PLANE_SIZE;
  return spotLight;
};
