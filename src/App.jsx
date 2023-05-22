import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, Sparkles } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Model from "./Pepe2";
import { Button } from "react-bootstrap";
import { Scrollbar } from "smooth-scrollbar-react";
import "./index.css";
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [changeColor, setChangeColor] = useState(false);

  return (
    <>
      <div>
        <div
          style={{
            position: "fixed",
            top: 0,
          }}
          className='_container'
        >
          <Canvas className='__Canvas' camera={{ position: [0, 1, 3] }}>
            <hemisphereLight intensity={0.15} />
            <pointLight intensity={1} />
            <ambientLight intensity={0.1} />

            <directionalLight intensity={1} position={[0, 10, 0]} />
            {/* <OrbitControls /> */}

            <Suspense fallback={<>Loading..</>}>
              <mesh position={[0, -1, 0]}>
                <Model changeColor={changeColor} />
              </mesh>
            </Suspense>
            <Sparkles
              count={100}
              scale={10}
              size={2}
              speed={0.4}
              color={"#000"}
            />
            <Preload all />
          </Canvas>
        </div>
        <Scrollbar>
          <section data-scroll-section style={{ height: "1vh" }}></section>
          <section
            className='trigger'
            data-scroll-section
            style={{ height: "20vh" }}
          ></section>
        </Scrollbar>
      </div>

      <Button className='__Button' onClick={() => setChangeColor(!changeColor)}>
        PRESS ME
      </Button>
    </>
  );
}

export default App;
