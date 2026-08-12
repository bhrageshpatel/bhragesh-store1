import * as THREE from "three";

export function createPCBBoard() {

    const board = new THREE.Group();

    // ===============================
    // PCB Base
    // ===============================

    const pcb = new THREE.Mesh(

        new THREE.BoxGeometry(5, 3.2, 0.08),

        new THREE.MeshStandardMaterial({
            color: 0x0b5d46,
            roughness: 0.65,
            metalness: 0.15
        })

    );

    board.add(pcb);

    // ===============================
    // PCB Border
    // ===============================

    const border = new THREE.Mesh(

        new THREE.BoxGeometry(5.06, 3.26, 0.02),

        new THREE.MeshStandardMaterial({
            color: 0x0a7d5c,
            metalness: 0.3,
            roughness: 0.7
        })

    );

    border.position.z = -0.04;

    board.add(border);

    // ===============================
    // Gold Pads
    // ===============================

    const goldMaterial = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        metalness: 1,
        roughness: 0.2
    });

    for (let i = 0; i < 10; i++) {

        const pad = new THREE.Mesh(

            new THREE.BoxGeometry(0.25, 0.08, 0.02),

            goldMaterial

        );

        pad.position.set(
            -2.1 + i * 0.47,
            1.45,
            0.05
        );

        board.add(pad);

        const pad2 = pad.clone();

        pad2.position.y = -1.45;

        board.add(pad2);
    }

    // ===============================
    // Copper Traces
    // ===============================

    const traceMaterial = new THREE.MeshStandardMaterial({
        color: 0xc88b2a,
        metalness: 0.9,
        roughness: 0.35
    });

    const traces = [

        { x: -1.4, y: 0.8, w: 1.8, h: 0.03 },
        { x: 0.9, y: 0.5, w: 1.3, h: 0.03 },
        { x: -0.7, y: -0.4, w: 2.4, h: 0.03 },
        { x: 1.4, y: -1.0, w: 1.0, h: 0.03 },
        { x: -1.8, y: -1.1, w: 0.8, h: 0.03 },

        { x: -1.2, y: 0.1, w: 0.03, h: 1.2 },
        { x: 0.6, y: -0.2, w: 0.03, h: 1.4 },
        { x: 1.7, y: 0.7, w: 0.03, h: 0.8 }

    ];

    traces.forEach(trace => {

        const mesh = new THREE.Mesh(

            new THREE.BoxGeometry(
                trace.w,
                trace.h,
                0.01
            ),

            traceMaterial

        );

        mesh.position.set(
            trace.x,
            trace.y,
            0.051
        );

        board.add(mesh);

    });

    // ===============================
    // Capacitors
    // ===============================

    const capacitorMaterial = new THREE.MeshStandardMaterial({
        color: 0x2b2b2b,
        roughness: 0.35,
        metalness: 0.65
    });

    const topMaterial = new THREE.MeshStandardMaterial({
        color: 0xbdbdbd,
        metalness: 1,
        roughness: 0.15
    });

    const capacitorPositions = [

        [-1.3, 0.55],
        [-0.4, -0.75],
        [1.15, 0.45],
        [1.55, -0.55]

    ];

    capacitorPositions.forEach(([x, y]) => {

        const capacitor = new THREE.Group();

        // Body
        const body = new THREE.Mesh(

            new THREE.CylinderGeometry(
                0.12,
                0.12,
                0.32,
                24
            ),

            capacitorMaterial

        );

        body.rotation.x = Math.PI / 2;

        capacitor.add(body);

        // Silver Top
        const top = new THREE.Mesh(

            new THREE.CylinderGeometry(
                0.10,
                0.10,
                0.02,
                24
            ),

            topMaterial

        );

        top.rotation.x = Math.PI / 2;
        top.position.z = 0.17;

        capacitor.add(top);

        capacitor.position.set(
            x,
            y,
            0.18
        );

        board.add(capacitor);

    });

    // ===============================
    // Mounting Holes
    // ===============================

    const holeMaterial = new THREE.MeshStandardMaterial({
        color: 0x111111,
        roughness: 0.4,
        metalness: 0.7
    });

    const holes = [

        [-2.1, 1.2],
        [2.1, 1.0],
        [-1.8, -1.1],
        [1.9, -0.8]

    ];

    holes.forEach(([x, y]) => {

        const hole = new THREE.Mesh(

            new THREE.CylinderGeometry(
                0.08,
                0.08,
                0.05,
                24
            ),

            holeMaterial

        );

        hole.rotation.x = Math.PI / 2;

        hole.position.set(
            x,
            y,
            0.05
        );

        board.add(hole);

    });

    return board;

}