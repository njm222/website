import { useRef, useState } from 'react';
import { useFrame } from 'react-three-fiber';
import { a, useTransition } from '@react-spring/three';

function Box({ random, position, rotation, opacity, scale }) {
  const mesh = useRef();
  useFrame((state) => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01 * random;
    mesh.current.position.y +=
      (Math[random > 0.5 ? 'cos' : 'sin'](state.clock.getElapsedTime() * random) * random) / 50;
  });
  return (
    <a.mesh ref={mesh} position={position} rotation={rotation} scale={scale} receiveShadow castShadow>
      <boxBufferGeometry attach="geometry" args={[2.5, 2.5, 2.5]} />
      <a.meshStandardMaterial attach="material" transparent opacity={opacity} />
    </a.mesh>
  );
}

function FloatingBoxes() {
  const [data] = useState([
    [[-4, 0, 4], Math.random()],
    [[4, 0, 6], Math.random()],
    [[3, 0, 2], Math.random()],
    [[-3, 2, 0], Math.random()],
    [[0, 0, -4], Math.random()],
    [[0, 4, 4], Math.random()],
    [[0, -4, 0], Math.random()],
    [[-2, -6, -4], Math.random()],
  ]);
  const transition = useTransition(data, {
    from: { opacity: 0, scale: [0.1, 0.1, 0.1] },
    enter: { opacity: 1, scale: [1, 1, 1] },
    leave: { opacity: 0, scale: [0.1, 0.1, 0.1] },
    trail: 200,
  });
  return transition((props, [position, r]) => (
    <Box position={position} random={r} rotation={[r, r, r]} opacity={props.opacity} scale={props.scale} />
  ));
}

export default FloatingBoxes;
