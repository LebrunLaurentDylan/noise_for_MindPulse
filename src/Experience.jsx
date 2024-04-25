import { shaderMaterial, OrbitControls, useGLTF, Float } from "@react-three/drei";
import React, { useRef } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { gradientVertexShader } from "./shaders/gradient/vertex.js";
import { gradientFragmentShader } from "./shaders/gradient/fragment.js";
import * as THREE from "three";
import { Perf } from "r3f-perf";
import { Model } from "../public/models/logoMindPulse.jsx";

const GradientMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color("#8390C8"),
    uColorEnd: new THREE.Color("#AE8ABE"),
    uBlackColor: new THREE.Color("#01030d"),
    uMouse: new THREE.Vector2(0, 0),
  },
  gradientVertexShader,
  gradientFragmentShader
);

extend({ GradientMaterial });

export const mouseMove = () => {
  const [mousePosition, setMousePosition] = React.useState({
    x: null,
    y: null,
  });
  React.useEffect(() => {
    const updateMousePosition = (ev) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);
  return mousePosition;
};

export default function Experience() {
  const mousePosition = mouseMove();
 

  const normalizeRatio = (value, min, max) => (value - min) / (max - min);
//  console.log(
//    normalizeRatio(mousePosition.x, 0, window.innerWidth) - 0.5,
//    normalizeRatio(mousePosition.y, 0, window.innerHeight) - 0.5
//  );
  const gradientMaterial = useRef();
  useFrame((state, delta) => {
    gradientMaterial.current.uTime += delta;
    gradientMaterial.current.uMouse = new THREE.Vector2(
      normalizeRatio(mousePosition.x, 0, window.innerWidth) - 0.5,
      normalizeRatio(mousePosition.y, 0, window.innerHeight) - 0.5
    );
  });

  return (
    <>
      <Perf position="top-left" />
      <color args={["#030202"]} attach="background" />
      <mesh>
        <planeGeometry args={[15, 15]} />
        <gradientMaterial ref={gradientMaterial} side={THREE.DoubleSide} />
      </mesh>
      <Float>
        <Model position={[0,0,1]} rotation-x={Math.PI*0.5}/>
      </Float>
    </>
  );
}
