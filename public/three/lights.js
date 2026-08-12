import * as THREE from "three";

export function addLights(scene) {

    // Soft Ambient Light
    const ambient = new THREE.AmbientLight(
        0xffffff,
        0.9
    );

    scene.add(ambient);

    // Main Front Light
    const frontLight = new THREE.DirectionalLight(
        0xffffff,
        2.5
    );

    frontLight.position.set(5, 5, 6);

    scene.add(frontLight);

    // Blue Rim Light
    const rimLight = new THREE.DirectionalLight(
        0x4da6ff,
        1.2
    );

    rimLight.position.set(-6, 3, -5);

    scene.add(rimLight);

    // Warm Fill Light
    const fillLight = new THREE.DirectionalLight(
        0xfff2cc,
        0.8
    );

    fillLight.position.set(0, -4, 3);

    scene.add(fillLight);

}