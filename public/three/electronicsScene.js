import * as THREE from "three";

import { createPCBBoard } from "./objects/pcbBoard.js";
import { createChip } from "./objects/chip.js";
import { createESP32 } from "../../bhragesh-store-react/src/three/objects/esp32.js";

import { createSMDComponents } from "./objects/smdComponents.js";
import { createSMDResistors } from "./objects/smdResistors.js";
import { createCeramicCapacitors } from "./objects/ceramicCapacitors.js";
import { createLEDs } from "./objects/leds.js";
import { createPinHeaders } from "./objects/pinHeaders.js";

export function createElectronicsScene() {

    const group = new THREE.Group();

    // ===============================
    // PCB Board
    // ===============================

    const pcb = createPCBBoard();
    group.add(pcb);

    // Pin Headers
    const headers = createPinHeaders();
    group.add(headers);

    // SMD Components
    const smd = createSMDComponents();
    group.add(smd);

    // SMD Resistors
    const resistors = createSMDResistors();
    group.add(resistors);

    // Ceramic Capacitors
    const ceramicCaps = createCeramicCapacitors();
    group.add(ceramicCaps);

    // LEDs
    const leds = createLEDs();
    group.add(leds);

    // ===============================
    // CPU Chip
    // ===============================

    const chip = createChip();
    chip.position.set(0, 0, 0.18);

    group.add(chip);

    // ===============================
    // ESP32 Module
    // ===============================

    const esp32 = createESP32();

    esp32.scale.set(0.45, 0.45, 0.45);
    esp32.position.set(1.8, 0.5, 0.15);
    esp32.rotation.z = -0.35;

    group.add(esp32);

    return group;
}