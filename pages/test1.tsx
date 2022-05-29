import type { NextPage } from "next";
import * as THREE from 'three'
import { useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
const Test1: NextPage = () => {
  const threeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {}, []);

  return (
      <Canvas style={{
          height: '1000px'
      }}>
          <ambientLight />
          <pointLight position={[2, 2, 2]} />
          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} />
      </Canvas>
  );
};

const Box = (props: JSX.IntrinsicElements['mesh']) => {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((state, delta) => {
      if (mesh.current) {
        mesh.current.rotation.x += 0.01
        return 
      }
  });
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
        <boxGeometry args={[1,1, 1]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
};

export default Test1;
