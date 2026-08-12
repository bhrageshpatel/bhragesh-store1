import * as THREE from "three";

export function createPinHeaders() {

    const group = new THREE.Group();

    const blackMaterial = new THREE.MeshStandardMaterial({
        color: 0x111111,
        roughness: 0.4
    });

    const goldMaterial = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        metalness: 1,
        roughness: 0.2
    });

    function createRow(y) {

        for (let i = 0; i < 10; i++) {

            const base = new THREE.Mesh(

                new THREE.BoxGeometry(0.18,0.18,0.10),

                blackMaterial

            );

            base.position.set(
                -2.1 + i*0.46,
                y,
                0.10
            );

            group.add(base);

            const pin = new THREE.Mesh(

                new THREE.BoxGeometry(0.05,0.05,0.20),

                goldMaterial

            );

            pin.position.set(
                -2.1 + i*0.46,
                y,
                0.23
            );

            group.add(pin);

        }

    }

    createRow(1.28);
    createRow(-1.28);

    return group;

}