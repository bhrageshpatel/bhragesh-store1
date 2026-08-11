import { createScene } from "./scene.js";
import { createCamera } from "./camera.js";
import { createRenderer } from "./renderer.js";
import { addLights } from "./lights.js";

const scene = createScene();
const camera = createCamera();
const renderer = createRenderer();

// document.body.appendChild(renderer.domElement);
const canvasContainer = document.getElementById("hero-canvas");

canvasContainer.appendChild(renderer.domElement);

addLights(scene);

function animate() {

    requestAnimationFrame(animate);

    renderer.render(scene, camera);

}

animate();