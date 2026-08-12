import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Robot from "./robot";

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 8], fov: 35 }}
    >
      {/* Lights */}
      <ambientLight intensity={2} />

      <directionalLight
        position={[5, 5, 5]}
        intensity={3}
      />

      <directionalLight
        position={[-5, 3, 3]}
        intensity={2}
      />

      <pointLight
        position={[0, 2, 2]}
        intensity={2}
      />

      {/* Robot */}
      <Robot />

      {/* Controls */}
      <OrbitControls
        autoRotate
        autoRotateSpeed={2}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
}