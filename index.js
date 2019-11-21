import { render as rainingCubes } from './animations/raining-cubes';
import { render as walking } from './animations/walking';

const animations = {
  rainingCubes: {
    name: 'Raining Cubes',
    render: rainingCubes,
  },
  walking: {
    name: 'Walking',
    render: walking,
  },
};

let currentAnimation = animations.walking;

const animate = () => {
  requestAnimationFrame(animate);
  currentAnimation.render();
};

animate();
