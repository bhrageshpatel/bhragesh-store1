import * as THREE from "three";

export function createScene() {
    const scene = new THREE.Scene();

    // Transparent background
    scene.background = null;

    return scene;
}