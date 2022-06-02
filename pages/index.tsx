import type { NextPage } from "next";
import React, { useRef, Suspense } from "react";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { Canvas, ThreeEvent, useFrame } from "@react-three/fiber";
import styles from "../styles/Home.module.css";
import { proxy, useSnapshot } from "valtio";
import { HexColorPicker } from "react-colorful";
// import { ThreeEvent } from 'three';

const state = proxy({
  current: null,
  items: {
    laces: "#ff3",
    mesh: "#3f3",
    caps: "#3f3",
    inner: "#3f3",
    sole: "#3f3",
    stripes: "#3f3",
    band: "#3f3",
    patch: "#3f3",
  },
});

function Shoe({ ...props }) {
  const group = useRef<any>();
  const { nodes, materials }: any = useGLTF("/shoe-draco.glb");
  const snap = useSnapshot(state);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 20;
    group.current.rotation.x = Math.cos(t / 4) / 8;
    group.current.rotation.y = Math.sin(t / 4) / 8;
    group.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
  });
  const handleGroupPointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    console.log(e.object);
    state.current = e.object.material.name;
  };
  const handleGroupPointerMissed = () => {
    state.current = null;
  };
  return (
    <group ref={group} {...props} dispose={null}>
      <group
        ref={group}
        {...props}
        dispose={null}
        onPointerDown={handleGroupPointerDown}
        onPointerMissed={handleGroupPointerMissed}
      >
        <mesh
          geometry={nodes.shoe.geometry}
          material={materials.laces}
          material-color={snap.items.laces}
        />
        <mesh
          geometry={nodes.shoe_1.geometry}
          material={materials.mesh}
          material-color={snap.items.mesh}
        />
        <mesh
          geometry={nodes.shoe_2.geometry}
          material={materials.caps}
          material-color={snap.items.caps}
        />
        <mesh
          geometry={nodes.shoe_3.geometry}
          material={materials.inner}
          material-color={snap.items.inner}
        />
        <mesh
          geometry={nodes.shoe_4.geometry}
          material={materials.sole}
          material-color={snap.items.sole}
        />
        <mesh
          geometry={nodes.shoe_5.geometry}
          material={materials.stripes}
          material-color={snap.items.stripes}
        />
        <mesh
          geometry={nodes.shoe_6.geometry}
          material={materials.band}
          material-color={snap.items.band}
        />
        <mesh
          geometry={nodes.shoe_7.geometry}
          material={materials.patch}
          material-color={snap.items.patch}
        />
      </group>
    </group>
  );
}

function ColorPicker() {
  const snap = useSnapshot(state);
  return (
    <div className={styles.colorPicker}>
      <HexColorPicker
        color={snap.items[snap.current]}
        onChange={(color) => (state.items[state.current] = color)}
        style={{
          width: 150,
          height: 150,
          margin: 50,
        }}
      />
      <h1>{snap.current}</h1>
    </div>
  );
}

const Home: NextPage = () => {
  return (
    <div className={styles.container}>

      <Canvas  style={{ background: "#171717" }}>
        <ambientLight intensity={1} />
        <spotLight
          intensity={0.5}
          angle={0.1}
          penumbra={1}
          position={[10, 15, 10]}
          castShadow
        />
        <Suspense fallback={null}>
          <Shoe />
        </Suspense>
        <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={true} enablePan={true} />
      </Canvas>
      <ColorPicker />
    </div>
  );
};

export default Home;
