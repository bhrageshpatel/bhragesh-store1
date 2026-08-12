import * as THREE from "three";

export function createSMDResistors() {

    const group = new THREE.Group();

    const bodyMaterial = new THREE.MeshStandardMaterial({
        color: 0x2f2f2f,
        roughness: 0.5
    });

    const metalMaterial = new THREE.MeshStandardMaterial({
        color: 0xc8c8c8,
        metalness: 1,
        roughness: 0.2
    });

    const positions = [
        [-1.8, 0.9],
        [-0.8, 1.0],
        [0.9, -0.9],
        [1.6, 0.2],
        [-1.2, -0.3],
        [1.2, 1.0]
    ];

    positions.forEach(([x, y]) => {

        const resistor = new THREE.Group();

        const body = new THREE.Mesh(
            new THREE.BoxGeometry(0.22, 0.10, 0.08),
            bodyMaterial
        );

        resistor.add(body);

        const left = new THREE.Mesh(
            new THREE.BoxGeometry(0.04, 0.10, 0.09),
            metalMaterial
        );

        left.position.x = -0.11;

        resistor.add(left);

        const right = left.clone();

        right.position.x = 0.11;

        resistor.add(right);

        resistor.position.set(x, y, 0.10);

        group.add(resistor);

    });

    return group;

}