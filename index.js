import * as THREE from 'three';
import { Scene } from 'three';

const addRendererToDOM = (renderer, ...size) => {
  renderer.setSize(...size);
  document.body.appendChild(renderer.domElement);
};

const init = () => {
  console.log(THREE);
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
  );

  const renderer = new THREE.WebGLRenderer();

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.gammaInput = true;
  renderer.gammaOutput = true;

  addRendererToDOM(renderer, window.innerWidth, window.innerHeight);

  return {
    scene,
    camera,
    renderer,
  };
};

const renderCube = ({ scene, geometryParams, meshParams }) => {
  const geometry = new THREE.BoxGeometry(...geometryParams);
  const material = new THREE.MeshPhongMaterial(meshParams);
  const cube = new THREE.Mesh(geometry, material);
  cube.castShadow = true;

  cube.position.setX(Math.random() * 20 - 10);
  cube.position.setY(Math.random() * 20 - 10);
  cube.position.setZ(Math.random() * 20 - 10);

  scene.add(cube);
  return cube;
};

const createLight = () => {
  const ambient = new THREE.AmbientLight(0xffffff, 0.1);
  return ambient;
};

const renderAmbientLight = ({ scene }) => {
  const ambientLight = createLight();
  scene.add(ambientLight);
  return ambientLight;
};

const renderSpotLight = ({ scene }) => {
  const spotLight = new THREE.SpotLight(0xffffff, 1);
  spotLight.position.set(15, 40, 35);
  spotLight.angle = Math.PI / 4;
  spotLight.penumbra = 0.05;
  spotLight.decay = 2;
  spotLight.distance = 200;
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;
  spotLight.shadow.camera.near = 10;
  spotLight.shadow.camera.far = 200;
  scene.add(spotLight);
  return spotLight;
};

const renderLightHelpers = ({ scene, spotLight }) => {
  const lightHelper = new THREE.SpotLightHelper(spotLight);
  scene.add(lightHelper);
  const shadowCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
  scene.add(shadowCameraHelper);
  scene.add(new THREE.AxesHelper(10));
  return {
    lightHelper,
    shadowCameraHelper,
  };
};

const renderLighting = ({ scene, renderHelpers }) => {
  const ambient = renderAmbientLight({ scene });
  const spotLight = renderSpotLight({ scene });
  const helpers = renderHelpers
    ? renderLightHelpers({ scene, spotLight })
    : null;

  return { ambient, spotLight, helpers };
};

const renderPlane = ({ scene }) => {
  const material = new THREE.MeshPhongMaterial({
    color: 0x808080,
    dithering: true,
  });

  const geometry = new THREE.PlaneBufferGeometry(2000, 2000);
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

const cubes = new Array(2000).fill(null).map(() =>
  renderCube({
    scene: animation.scene,
    geometryParams: [1, 1, 1],
    meshParams: {
      color: Math.floor(Math.random() * 16777215),
      dithering: true,
    },
  })
);

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

const animate = () => {
  requestAnimationFrame(animate);
  animation.renderer.render(animation.scene, animation.camera);

  // update cubes
  // cubes.forEach(cube => {
  //   // cube.rotation.x += 0.01;
  //   // cube.rotation.y += 0.01;
  //   if (cube.position.y >= 0) {
  //     cube.position.y -= 0.01;
  //     cube.applyQuaternion(new THREE.Quaternion(0.01, 0.01, 0.01));
  //   }
  // });

  // update camera position
  if (animation.camera.position.z < 20000) {
    animation.camera.position.z += 0.3;
    animation.camera.position.y += 0.1;
    if (animation.camera.rotation.x >= -0.3) {
      animation.camera.rotateX(-0.002);
    }
  }
};

animation.camera.position.z = 5;

animate();
