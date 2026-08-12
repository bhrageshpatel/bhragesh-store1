import { useGLTF } from "@react-three/drei";

export default function Robot() {

  const { scene } = useGLTF("/models/robot.glb");

  return (

    <primitive
      object={scene}

      scale={.15}

      position={[1.2,-2.2,0]}

      rotation={[0,0.4,0]}
    />

  );

}