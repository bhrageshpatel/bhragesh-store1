import * as THREE from "three";

export function createLEDs() {

    const group = new THREE.Group();

    const colors = [
        0xff3b30,
        0x34c759,
        0x0a84ff,
        0xffcc00
    ];

    const positions = [
        [-1.7, 1.0],
        [-1.2, -0.9],
        [1.7, 0.8],
        [1.6, -1.0]
    ];

    colors.forEach((color, i) => {

        const led = new THREE.Mesh(

            new THREE.CylinderGeometry(
                0.07,
                0.07,
                0.10,
                20
            ),

            new THREE.MeshStandardMaterial({
                color,
                emissive: color,
                emissiveIntensity: 1.2,
                metalness: 0.1,
                roughness: 0.25
            })

        );

        led.rotation.x = Math.PI / 2;

        led.position.set(
            positions[i][0],
            positions[i][1],
            0.11
        );

        group.add(led);

    });

    return group;

}