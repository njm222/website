import { useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import { a, useTransition } from '@react-spring/three';
import { Plane } from 'drei';
import { useTweaks } from 'use-tweaks';

const BOXES_ARGS = [
  {
    args: [1.5, 1.5, 1.5],
    position: [-1.5, 1.5 / 2, 2.5],
    rotation: [0, -Math.PI / 64, 0],
    random: 3 * Math.random()
  },
  {
    args: [3, 3, 3],
    position: [0, 3 / 2, 0],
    rotation: [0, 0, 0],
    random: 3 * Math.random()
  },
  {
    args: [3.2, 3.2, 3.2],
    position: [4, 3.2 / 2 + 0.65, -0.5],
    rotation: [0, -Math.PI / 32, Math.PI / 4],
    random: 3 * Math.random()
  },
]

function Box({ random, rotation, position, args, opacity, scale, loading }) {
  const mesh = useRef();
  useFrame((state) => {
    if (loading === 0) return
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01 * random * loading;
    mesh.current.position.y += loading * 
      (Math[random > 0.5 ? 'cos' : 'sin'](state.clock.getElapsedTime() * random) * random) / 20;
  });
  return (
    <a.mesh ref={mesh} position={position} rotation={rotation} scale={scale} receiveShadow castShadow>
      <boxBufferGeometry args={args} />
      <a.meshStandardMaterial transparent opacity={opacity} />
    </a.mesh>
  );
}

function FloatingBoxes() {
  const group = useRef()
  const { loading } = useTweaks({
    loading: { value: 0, min: 0, max: 1 },
  })
  const transition = useTransition(BOXES_ARGS, {
    from: { opacity: 0, scale: [0.1, 0.1, 0.1] },
    enter: { opacity: 1, scale: [1, 1, 1] },
    leave: { opacity: 0, scale: [0.1, 0.1, 0.1] },
    trail: 200,
  });
  useFrame(() => {
    group.current.rotation.y += 0.01 * loading;
    group.current.position.y = loading * 10 +loading 
  })
  return (
    <group ref={group}>
      {transition((props, data) => (
        <Box {...data} opacity={props.opacity} scale={props.scale} loading={loading} />
      ))}
    </group>
  )
  ;
}

function FloatingBoxesScene() {

  return (
    <>
      <group position={[0, -4, 1]}>
        <FloatingBoxes  />
        <Plane args={[1000,1000]} rotation={[-Math.PI/2, 0, 0]} receiveShadow>
          <meshStandardMaterial />
        </Plane>
      </group>
      <directionalLight
        castShadow
        position={[2.5, 20, 1]}
        intensity={4}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
    </>
  )
}

export default FloatingBoxesScene;
