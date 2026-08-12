import * as THREE from "three";

export function createChip() {

    const chip = new THREE.Group();

    // Main Body
    const body = new THREE.Mesh(

        new THREE.BoxGeometry(1.8, 1.8, 0.25),

        new THREE.MeshStandardMaterial({
            color: 0x1d1d1d,
            roughness: 0.45,
            metalness: 0.25
        })

    );

    chip.add(body);

    // Top Plate
    const top = new THREE.Mesh(

        new THREE.BoxGeometry(1.35, 1.35, 0.03),

        new THREE.MeshStandardMaterial({
            color: 0x2f2f2f,
            roughness: 0.25
        })

    );

    top.position.z = 0.14;

    chip.add(top);

    // Pins
    const pinMaterial = new THREE.MeshStandardMaterial({

        color: 0xd4af37,

        metalness: 1,

        roughness: 0.2

    });

    for(let i=0;i<8;i++){

        const pin1 = new THREE.Mesh(

            new THREE.BoxGeometry(0.08,0.22,0.05),

            pinMaterial

        );

        pin1.position.set(-0.78+i*0.22,1.02,0);

        chip.add(pin1);


        const pin2 = pin1.clone();

        pin2.position.y=-1.02;

        chip.add(pin2);


        const pin3 = new THREE.Mesh(

            new THREE.BoxGeometry(0.22,0.08,0.05),

            pinMaterial

        );

        pin3.position.set(1.02,-0.78+i*0.22,0);

        chip.add(pin3);


        const pin4 = pin3.clone();

        pin4.position.x=-1.02;

        chip.add(pin4);

    }

    return chip;

}