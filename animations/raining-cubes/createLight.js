import { AmbientLight } from 'three';

export const createLight = () => {
  const ambient = new AmbientLight(0xccacff, 0.2);
  return ambient;
};
