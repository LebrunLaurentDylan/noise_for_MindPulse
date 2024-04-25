import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { mouseMove } from "../../src/Experience";

export function Model(props) {
  const { nodes, materials } = useGLTF("/models/logo_mindpulse.glb");
  const mousePosition = mouseMove();
  const normalizeRatio = (value, min, max) => (value - min) / (max - min);
  return (
    <>
      <group {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Curve002.geometry}
          material={materials.material}
          scale={[150, 30, 150]}
        />
      </group>
    </>
  );
}

useGLTF.preload("/models/logo_mindpulse.glb");
