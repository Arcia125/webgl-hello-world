import {
  Scene,
  WebGLRenderer,
  PCFSoftShadowMap,
  PerspectiveCamera,
  MeshPhongMaterial,
  PlaneBufferGeometry,
  Mesh,
  Fog,
  HemisphereLight,
  Vector3,
  Raycaster,
  VertexColors,
  BoxBufferGeometry,
  Color,
  Float32BufferAttribute,
} from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

import { SETTINGS } from './SETTINGS';

export const init = () => {
  const scene = new Scene();

  scene.fog = new Fog(0xffffff, 0, 400);

  const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    4000
  );

  camera.position.y = 10;

  const controls = new PointerLockControls(camera, document.body);

  controls.lock();

  scene.add(controls.getObject());

  const raycaster = new Raycaster(new Vector3(), new Vector3(0, -1, 0), 0, 10);

  const velocity = new Vector3();

  const direction = new Vector3();

  const moveForward = false;
  const moveBackward = false;
  const moveLeft = false;
  const moveRight = false;
  const canJump = false;
  const prevTime = performance.now();

  const state = {
    velocity,
    direction,
    moveForward,
    moveBackward,
    moveLeft,
    moveRight,
    canJump,
    prevTime,
  };

  const onKeyDown = event => {
    switch (event.keyCode) {
      case 38: // up
      case 87: // w
        state.moveForward = true;
        break;
      case 37: // left
      case 65: // a
        state.moveLeft = true;
        break;
      case 40: // down
      case 83: // s
        state.moveBackward = true;
        break;
      case 39: // right
      case 68: // d
        state.moveRight = true;
        break;
      case 32: // space
        if (state.canJump === true) state.velocity.y = 1000;
        state.canJump = false;
        break;
    }
  };
  const onKeyUp = event => {
    switch (event.keyCode) {
      case 38: // up
      case 87: // w
        state.moveForward = false;
        break;
      case 37: // left
      case 65: // a
        state.moveLeft = false;
        break;
      case 40: // down
      case 83: // s
        state.moveBackward = false;
        break;
      case 39: // right
      case 68: // d
        state.moveRight = false;
        break;
    }
  };
  const onClick = () => {
    controls.lock();
  };
  document.addEventListener('keydown', onKeyDown, false);
  document.addEventListener('keyup', onKeyUp, false);
  document.addEventListener('click', onClick);
  const light = new HemisphereLight(0xeeeeff, 0x777788, 0.75);
  light.position.set(0.5, 1, 0.75);
  scene.add(light);

  const planeMeshMaterial = new MeshPhongMaterial({
    color: 0x808080,
    dithering: true,
  });

  const planeGeometry = new PlaneBufferGeometry(
    SETTINGS.PLANE_SIZE,
    SETTINGS.PLANE_SIZE
  );

  const planeMesh = new Mesh(planeGeometry, planeMeshMaterial);
  planeMesh.position.set(0, -1, 0);
  planeMesh.rotation.x = -Math.PI * 0.5;
  planeMesh.receiveShadow = true;

  scene.add(planeMesh);

  const renderer = new WebGLRenderer({
    antialias: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;
  renderer.gammaInput = true;
  renderer.gammaOutput = true;

  document.body.appendChild(renderer.domElement);

  let boxGeometry = new BoxBufferGeometry(20, 20, 20);
  // boxGeometry = boxGeometry.toNonIndexed(); // ensure each face has unique vertices
  const boxPosition = boxGeometry.attributes.position;
  const colors = [];
  const color = new Color();

  for (var i = 0, l = boxPosition.count; i < l; i++) {
    color.setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
    colors.push(color.r, color.g, color.b);
  }
  boxGeometry.setAttribute('color', new Float32BufferAttribute(colors, 3));

  const objects = new Array(1000).fill(null).map(() => {
    const material = new MeshPhongMaterial({
      specular: 0xffffff,
      flatShading: true,
      vertexColors: VertexColors,
    });
    material.color.setHSL(
      Math.random() * 0.2 + 0.5,
      0.75,
      Math.random() * 0.15 + 0.75
    );
    const box = new Mesh(boxGeometry, material);

    box.position.x = Math.floor(Math.random() * 20 - 10) * 20;
    box.position.y = Math.floor(Math.random() * 40) * 40 + 20;
    box.position.z = Math.floor(Math.random() * 20 - 10) * 20;

    scene.add(box);

    return box;
  });

  return {
    scene,
    camera,
    renderer,
    controls,
    raycaster,
    state,
    objects,
  };
};
