import { SETTINGS } from './SETTINGS';
import { selectRandom } from './selectRandom';
import { fallingQuaternions } from './fallingQuaternions';
import { createCube } from './createCube';
import { getRandomColor } from './getRandomColor';

export const createCubes = () => {
  const cubes = new Array(SETTINGS.CUBE_COUNT).fill(null).map(() => {
    const cubeSize = Math.max(
      SETTINGS.MIN_CUBE_SIZE,
      Math.random() * SETTINGS.MAX_CUBE_SIZE
    );
    const cube = createCube({
      geometryParams: [cubeSize, cubeSize, cubeSize],
      meshParams: {
        color: getRandomColor(),
        dithering: true,
      },
    });

    cube.fallingQuaternion = selectRandom(fallingQuaternions);

    return cube;
  });

  cubes.update = () => {
    cubes.forEach(cube => {
      if (cube.position.y >= 0) {
        cube.position.y -= SETTINGS.CUBE_FALL_SPEED;
        cube.applyQuaternion(cube.fallingQuaternion);
      } else {
        cube.position.y = (Math.random() * SETTINGS.PLANE_SIZE) / 2;
      }
    });
  };

  return cubes;
};
