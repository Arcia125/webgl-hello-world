import { createSpotLight } from './createSpotLight';
import { createLight } from './createLight';

export const createLighting = () => {
  const ambient = createLight();

  const spotLight = createSpotLight();

  return { ambient, spotLight };
};
