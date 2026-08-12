import * as THREE from "three";

export function createSMDComponents() {

    const group = new THREE.Group();

    const bodyMaterial = new THREE.MeshStandardMaterial({
        color: 0x1f1f1f,
        roughness: 0.35,
        metalness: 0.4
    });

    const pinMaterial = new THREE.MeshStandardMaterial({
        color: 0xd9d9d9,
        roughness: 0.2,
        metalness: 1
    });

    const positions = [

        [-1.55, 0.92],
        [-1.10, -0.55],
        [0.95, 1.00],
        [1.40, -0.25],
        [0.30, -1.05],
        [-0.20, 1.10]

    ];

    positions.forEach(([x, y]) => {

        const smd = new THREE.Group();

        const body = new THREE.Mesh(

            new THREE.BoxGeometry(0.22, 0.12, 0.08),

            bodyMaterial

        );

        smd.add(body);

        const left = new THREE.Mesh(

            new THREE.BoxGeometry(0.05, 0.12, 0.02),

            pinMaterial

        );

        left.position.x = -0.13;

        smd.add(left);

        const right = left.clone();

        right.position.x = 0.13;

        smd.add(right);

        smd.position.set(x, y, 0.09);

        smd.rotation.z = Math.random() * Math.PI;

        group.add(smd);

    });

    return group;

}