import { init } from './init';

let animation;

export const render = () => {
  if (!animation) animation = init();

  animation.renderer.render(animation.scene, animation.camera);

  if (animation.controls.isLocked === true) {
    animation.raycaster.ray.origin.copy(
      animation.controls.getObject().position
    );
    animation.raycaster.ray.origin.y -= 10;
    const intersections = animation.raycaster.intersectObjects(
      animation.objects
    );
    const onObject = intersections.length > 0;
    const time = performance.now();
    const delta = (time - animation.state.prevTime) / 1000;
    animation.state.velocity.x -= animation.state.velocity.x * 10.0 * delta;
    animation.state.velocity.z -= animation.state.velocity.z * 10.0 * delta;
    animation.state.velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
    animation.state.direction.z =
      Number(animation.state.moveForward) -
      Number(animation.state.moveBackward);
    animation.state.direction.x =
      Number(animation.state.moveRight) - Number(animation.state.moveLeft);
    animation.state.direction.normalize(); // this ensures consistent movements in all directions
    if (animation.state.moveForward || animation.state.moveBackward)
      animation.state.velocity.z -= animation.state.direction.z * 400.0 * delta;
    if (animation.state.moveLeft || animation.state.moveRight)
      animation.state.velocity.x -= animation.state.direction.x * 400.0 * delta;
    if (onObject === true) {
      animation.state.velocity.y = Math.max(0, animation.state.velocity.y);
      animation.state.canJump = true;
    }
    animation.controls.moveRight(-animation.state.velocity.x * delta);
    animation.controls.moveForward(-animation.state.velocity.z * delta);
    animation.controls.getObject().position.y +=
      animation.state.velocity.y * delta; // new behavior
    if (animation.controls.getObject().position.y < 10) {
      animation.state.velocity.y = 0;
      animation.controls.getObject().position.y = 10;
      animation.state.canJump = true;
    }
    animation.state.prevTime = time;
  }
};
