import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const SETTINGS = {
  PLANE_SIZE: 2000,
};

const addRendererToDOM = (renderer, ...size) => {
  renderer.setSize(...size);
  document.body.appendChild(renderer.domElement);
};

const init = () => {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
  );

  const spotlight = renderSpotLight({ scene });

  const renderer = new THREE.WebGLRenderer();

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.gammaInput = true;
  renderer.gammaOutput = true;

  scene.add(camera);

  addRendererToDOM(renderer, window.innerWidth, window.innerHeight);

  const controls = new OrbitControls(camera, renderer.domElement);

  return {
    scene,
    camera,
    renderer,
    spotlight,
    controls,
  };
};

const renderCube = ({ scene, geometryParams, meshParams }) => {
  const geometry = new THREE.BoxGeometry(...geometryParams);
  const material = new THREE.MeshPhongMaterial(meshParams);
  const cube = new THREE.Mesh(geometry, material);
  cube.castShadow = true;

  const CUBE_SPREAD = SETTINGS.PLANE_SIZE / 2;
  const getRandomCoord = () => Math.random() * CUBE_SPREAD - CUBE_SPREAD / 2;

  cube.position.setX(getRandomCoord());
  cube.position.setY(Math.max(0, getRandomCoord()));
  cube.position.setZ(getRandomCoord());

  scene.add(cube);
  return cube;
};

const createLight = () => {
  const ambient = new THREE.AmbientLight(0xccacff, 0.2);
  return ambient;
};

const renderAmbientLight = ({ scene }) => {
  const ambientLight = createLight();
  scene.add(ambientLight);
  return ambientLight;
};

const renderSpotLight = ({ scene }) => {
  const spotLight = new THREE.SpotLight(0xffffff, 1);
  spotLight.position.set(50, 200, -200);
  spotLight.angle = Math.PI / 4;
  spotLight.penumbra = 0.05;
  spotLight.decay = 2;
  spotLight.distance = SETTINGS.PLANE_SIZE * 2;
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;
  spotLight.shadow.camera.near = 10;
  spotLight.shadow.camera.far = SETTINGS.PLANE_SIZE;
  scene.add(spotLight);
  return spotLight;
};

const renderLightHelpers = ({ scene }) => {
  const lightHelper = new THREE.SpotLightHelper(animation.spotlight);
  scene.add(lightHelper);
  const shadowCameraHelper = new THREE.CameraHelper(
    animation.spotlight.shadow.camera
  );
  scene.add(shadowCameraHelper);
  scene.add(new THREE.AxesHelper(10));
  return {
    lightHelper,
    shadowCameraHelper,
  };
};

const renderLighting = ({ scene, renderHelpers }) => {
  const ambient = renderAmbientLight({ scene });
  const helpers = renderHelpers ? renderLightHelpers({ scene }) : null;

  return { ambient, helpers };
};

const renderPlane = ({ scene }) => {
  const material = new THREE.MeshPhongMaterial({
    color: 0x808080,
    dithering: true,
  });

  const geometry = new THREE.PlaneBufferGeometry(
    SETTINGS.PLANE_SIZE,
    SETTINGS.PLANE_SIZE
  );
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, -1, 0);
  mesh.rotation.x = -Math.PI * 0.5;
  mesh.receiveShadow = true;
  scene.add(mesh);
  return {
    material,
    geometry,
    mesh,
  };
};

const animation = init();

const fallingQuaternions = [
  new THREE.Quaternion().setFromEuler(new THREE.Euler(0.041, 0.065, 0.075)),
  new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.055, 0.0278, 0.05)),
  new THREE.Quaternion().setFromEuler(new THREE.Euler(0.025, -0.0478, 0.05)),
  new THREE.Quaternion().setFromEuler(new THREE.Euler(0.025, 0.0478, -0.089)),
];

const selectRandom = arr => arr[Math.floor(Math.random() * arr.length)];

const cubes = new Array(4000).fill(null).map(() => {
  const cubeSize = Math.random() * 10;
  const cube = renderCube({
    scene: animation.scene,
    geometryParams: [cubeSize, cubeSize, cubeSize],
    meshParams: {
      color: Math.floor(Math.random() * 16777215),
      dithering: true,
    },
  });

  cube.fallingQuaternion = selectRandom(fallingQuaternions);
  return cube;
});

// const cube = renderCube({
//   scene: animation.scene,
//   geometryParams: [1, 1, 1],
//   meshParams: { color: 0xaaccff, dithering: true },
// });

const lighting = renderLighting({
  scene: animation.scene,
  renderHelpers: false,
});

renderPlane({ scene: animation.scene });

const render = () => {
  // requestAnimationFrame(animate);
  animation.renderer.render(animation.scene, animation.camera);

  // update cubes
  cubes.forEach(cube => {
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    if (cube.position.y >= 0) {
      cube.position.y -= 0.9;
      cube.applyQuaternion(cube.fallingQuaternion);
    } else {
      cube.position.y = (Math.random() * SETTINGS.PLANE_SIZE) / 2;
    }
  });

  // update camera position
  // if (animation.camera.position.z < 5000) {
  //   animation.camera.position.z +=
  //     0.0001 * (5000 - animation.camera.position.z);
  //   animation.camera.position.y += 0.1;
  //   if (animation.camera.rotation.x >= -0.3) {
  //     animation.camera.rotateX(-0.002);
  //   }
  // }
};

animation.camera.position.copy(
  new THREE.Vector3(170.19419412006138, 138.38052870569922, 183.04975848916706)
);

animation.camera.rotation.x = -0.647312372951345;
animation.camera.rotation.y = 0.6381579326280384;
animation.camera.rotation.z = 0.42314114614066933;

export { render };
