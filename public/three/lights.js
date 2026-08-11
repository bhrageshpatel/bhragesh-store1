import * as THREE from "three";

export function addLights(scene) {

    const light = new THREE.AmbientLight(0xffffff, 2);

    scene.add(light);

}