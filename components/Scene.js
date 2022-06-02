import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const gltf = useGLTF('/scene.gltf'); // public下的images
  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={gltf.scene} />
    </group>
  )
}

useGLTF.preload('/scene.gltf'); // 预加载
