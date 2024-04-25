import "./App.css";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";

function App() {
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          zIndex: -1,
        }}
      >
        <Canvas
          flat
          orthographic
          camera={{
            zoom: 200,
            near: 0.1,
            far: 200,
            position: [0, 0, 4],
          }}
        >
          <Perf position="top-left" />
          <OrbitControls makeDefault />
          <Experience />
        </Canvas>
      </div>
    </>
  );
}

export default App;
