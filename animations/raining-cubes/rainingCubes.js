import { init } from './init';

let animation;

const render = () => {
  if (!animation) {
    animation = init();
  }
  animation.renderer.render(animation.scene, animation.camera);

  animation.cubes.update();
};

export { render };
