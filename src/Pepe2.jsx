import React, { useRef, useEffect, useState } from "react";
import { useGLTF, useAnimations, Sparkles } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useControls } from "leva";
gsap.registerPlugin(ScrollTrigger);

export default function Model(props) {
  const group = useRef();
  const cameraGroup = useRef();
  const sceneRef = useRef();
  const { nodes, materials, animations } = useGLTF("/pepe2-transformed.glb");
  const { actions } = useAnimations(animations, group);
  const [textures, setTextures] = useState([
    "Material.005",
    "clothes.001",
    "eye_brown.001",
    "Feather.001",
  ]);
  const [activeTexture, setActiveTexture] = useState("clothes.001");
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
    if (actions["Armature.001|mixamo.com|Layer0"])
      actions["Armature.001|mixamo.com|Layer0"].play();
  }, [actions]);

  useEffect(() => {
    setActiveTexture(textures[Math.floor(Math.random() * textures.length)]);
  }, [props.changeColor]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group ref={cameraGroup}></group>
      <group ref={sceneRef} name='Scene' scale={[3, 3, 3]}>
        <group name='Armature001' rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
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
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/pepe2-transformed.glb");
