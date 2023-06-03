import React, { useRef, useEffect, useState } from "react";
import { useGLTF, useAnimations, Sparkles } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useControls } from "leva";
gsap.registerPlugin(ScrollTrigger);
const MODALS = ["/pepe2-transformed.glb", "/Superman1.glb", "/devil_1.glb"];
export default function Model({ index }) {
  let mixer;
  const group = useRef();
  const cameraGroup = useRef();
  const sceneRef = useRef();
  const angel = useGLTF(MODALS[0]);
  const superman = useGLTF(MODALS[1]);
  const devil = useGLTF(MODALS[2]);
  const [currentModal, setCurrentModal] = useState(angel);

  useEffect(() => {
    if (currentModal) {
      mixer = new THREE.AnimationMixer(currentModal.scene);
      mixer.clipAction(currentModal.animations[0]).play();
    }
  }, [currentModal]);
  useFrame((state, delta) => {
    mixer.update(delta);
    // console.log(ca);
  });
  const { camera } = useThree();

  useEffect(() => {
    if (cameraGroup.current) {
      cameraGroup.current.add(camera);

      camera.position.set(0, 5.5, 1.5); // this sets the boom's length
      camera.lookAt(0, 4.4, 0); // camera looks at the boom's zero
    }
  }, []);

  useEffect(() => {
    if (cameraGroup.current) {
      const t1 = gsap.timeline();
      const scrollDirection = { value: 0 };
      const scrollDuration = 5; // Adjust this value to control the overall duration of the scroll animation
      let previousScrollPos = 0;
      t1.to(cameraGroup.current.rotation, {
        y: Math.PI * 2 * 2,
        duration: 400,
        ease: "power2.easeOut",
      });

      ScrollTrigger.create({
        animation: t1,
        trigger: ".trigger",
        start: "top top",
        end: `+=${window.innerHeight * scrollDuration * 2}`, // Adjust this value to control the total distance of the scroll animation
        scrub: 2,

        pin: true,
        anticipatePin: true,
        onUpdate: (self) => {
          if (
            (camera.position.z < 1.5 && self.direction < 0) ||
            (camera.position.z > 8 && self.direction > 0)
          ) {
            return;
          }

          camera.position.z += self.getVelocity() * 0.00001;
        },
      });
    }
  }, [cameraGroup.current]);

  useEffect(() => {
    if (index === 0) {
      setCurrentModal(angel);
    } else if (index === 1) {
      setCurrentModal(superman);
      superman.scene.position.y -= 0.1;
    } else if (index === 2) {
      setCurrentModal(devil);
    }
  }, [index]);

  return (
    <group ref={group} dispose={null}>
      <group ref={cameraGroup}></group>
      <group
        ref={sceneRef}
        name='Scene'
        scale={currentModal === devil ? [6, 6, 6] : [3, 3, 3]}
      >
        <primitive object={currentModal.scene} />
        {/* <group name='Armature001' rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            name='Angel_Crown001'
            geometry={nodes.Angel_Crown001.geometry}
            material={materials["Material.002"]}
            skeleton={nodes.Angel_Crown001.skeleton}
          />
          <skinnedMesh
            name='Body001'
            geometry={nodes.Body001.geometry}
            material={materials["Material.005"]}
            skeleton={nodes.Body001.skeleton}
          />
          <skinnedMesh
            name='Cloth001'
            geometry={nodes.Cloth001.geometry}
            material={materials[activeTexture]}
            skeleton={nodes.Cloth001.skeleton}
          />
          <skinnedMesh
            name='Eye_Ball_Brown001'
            geometry={nodes.Eye_Ball_Brown001.geometry}
            material={materials["Material.001"]}
            skeleton={nodes.Eye_Ball_Brown001.skeleton}
          />
          <skinnedMesh
            name='Eye_Ball_Brown003'
            geometry={nodes.Eye_Ball_Brown003.geometry}
            material={materials["eye_brown.001"]}
            skeleton={nodes.Eye_Ball_Brown003.skeleton}
          />
          <skinnedMesh
            name='Eye_Ball_Brown006'
            geometry={nodes.Eye_Ball_Brown006.geometry}
            material={materials["eye_brown.001"]}
            skeleton={nodes.Eye_Ball_Brown006.skeleton}
          />
          <group name='R_Wing1404'>
            <skinnedMesh
              name='Mesh1406'
              geometry={nodes.Mesh1406.geometry}
              material={materials["Feather.001"]}
              skeleton={nodes.Mesh1406.skeleton}
            />
            <skinnedMesh
              name='Mesh1406_1'
              geometry={nodes.Mesh1406_1.geometry}
              material={materials["Wing.001"]}
              skeleton={nodes.Mesh1406_1.skeleton}
            />
          </group>
        </group> */}
      </group>
    </group>
  );
}

useGLTF.preload("/pepe2-transformed.glb");
