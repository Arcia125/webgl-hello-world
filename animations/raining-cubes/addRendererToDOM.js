export const addRendererToDOM = (renderer, ...size) => {
  renderer.setSize(...size);
  document.body.appendChild(renderer.domElement);
};
