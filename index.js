import { render as rainingCubes } from './animations/raining-cubes';

const animations = {
  rainingCubes: {
    name: 'Raining Cubes',
    render: rainingCubes,
  },
};

let currentAnimation = animations.rainingCubes;

const animate = () => {
  requestAnimationFrame(animate);
  currentAnimation.render();
};

animate();
