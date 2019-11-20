import { WebGLRenderer, PCFSoftShadowMap } from 'three';

export const createRenderer = () => {
  const renderer = new WebGLRenderer();
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;
  renderer.gammaInput = true;
  renderer.gammaOutput = true;
  return renderer;
};
