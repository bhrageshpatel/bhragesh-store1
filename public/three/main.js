import { createScene } from "./scene.js";
import { createCamera } from "./camera.js";
import { createRenderer } from "./renderer.js";
import { addLights } from "./lights.js";

import { createElectronicsScene } from "./electronicsScene.js";

// ===============================
// Canvas
// ===============================

const canvasContainer =
    document.getElementById("hero-canvas");

// ===============================
// Scene
// ===============================

const scene = createScene();

const camera =
    createCamera(canvasContainer);

const renderer =
    createRenderer(canvasContainer);

canvasContainer.appendChild(
    renderer.domElement
);

// ===============================
// Lights
// ===============================

addLights(scene);

// ===============================
// Electronics Scene
// ===============================

const electronics =
    createElectronicsScene();

scene.add(electronics);

electronics.scale.set(0.6, 0.6, 0.6);

// ===============================
// Animation
// ===============================

function animate() {

    requestAnimationFrame(animate);

    const time = Date.now();

    // electronics.rotation.y = 0;
    electronics.rotation.y =
     Math.sin(time * 0.0004) * 0.18;

    electronics.rotation.x =
        Math.sin(time * 0.001) * 0.15;

    electronics.position.y =
        Math.sin(time * 0.0015) * 0.18;

    renderer.render(scene, camera);

}

animate();

// ===============================
// Resize
// ===============================

window.addEventListener("resize", () => {

    const width =
        canvasContainer.clientWidth;

    const height =
        canvasContainer.clientHeight;

    camera.aspect = width / height;

    camera.updateProjectionMatrix();

    renderer.setSize(width, height);

});