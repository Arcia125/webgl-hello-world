import { Scene } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { addRendererToDOM } from './addRendererToDOM';
import { createLighting } from './createLighting';
import { createCubes } from './createCubes';
import { createPlane } from './createPlane';
import { createCamera } from './createCamera';
import { createRenderer } from './createRenderer';

export const init = () => {
  const scene = new Scene();

  const camera = createCamera();

  const renderer = createRenderer();

  const plane = createPlane();

  const cubes = createCubes();

  scene.add(camera);

  addRendererToDOM(renderer, window.innerWidth, window.innerHeight);

  const controls = new OrbitControls(camera, renderer.domElement);

  const lighting = createLighting();

  scene.add(...Object.values(lighting));

  scene.add(...cubes);

  scene.add(plane.mesh);

  return {
    scene,
    camera,
    renderer,
    lighting,
    controls,
    cubes,
  };
};
