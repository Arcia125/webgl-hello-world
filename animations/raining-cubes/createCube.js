import { BoxGeometry, MeshPhongMaterial, Mesh } from 'three';
import { SETTINGS } from './SETTINGS';

export const createCube = ({ geometryParams, meshParams }) => {
  const geometry = new BoxGeometry(...geometryParams);
  const material = new MeshPhongMaterial(meshParams);
  const cube = new Mesh(geometry, material);

  cube.castShadow = true;

  const CUBE_SPREAD = SETTINGS.PLANE_SIZE;
  const getRandomCoord = () => Math.random() * CUBE_SPREAD - CUBE_SPREAD / 2;

  cube.position.setX(getRandomCoord());
  cube.position.setY(Math.max(0, getRandomCoord()));
  cube.position.setZ(getRandomCoord());

  return cube;
};
