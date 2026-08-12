import * as THREE from "three";

export function createCeramicCapacitors() {

    const group = new THREE.Group();

    const bodyMaterial = new THREE.MeshStandardMaterial({
        color: 0xd6c48d,
        roughness: 0.7
    });

    const metalMaterial = new THREE.MeshStandardMaterial({
        color: 0xc0c0c0,
        metalness: 1,
        roughness: 0.2
    });

    const positions = [
        [-0.6, 0.7],
        [0.8, 0.9],
        [1.4, -0.2],
        [-1.5, -0.8],
        [0.2, -1.0]
    ];

    positions.forEach(([x, y]) => {

        const cap = new THREE.Group();

        const body = new THREE.Mesh(
            new THREE.BoxGeometry(0.18,0.12,0.08),
            bodyMaterial
        );

        cap.add(body);

        const left = new THREE.Mesh(
            new THREE.BoxGeometry(0.03,0.12,0.09),
            metalMaterial
        );

        left.position.x = -0.09;

        cap.add(left);

        const right = left.clone();
        right.position.x = 0.09;

        cap.add(right);

        cap.position.set(x,y,0.10);

        group.add(cap);

    });

    return group;

}