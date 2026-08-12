import { useMemo } from "react";
import { createPCBBoard } from "../objects/pcbBoard";

export default function PCBScene() {
  const pcb = useMemo(() => createPCBBoard(), []);

  return <primitive object={pcb} />;
}