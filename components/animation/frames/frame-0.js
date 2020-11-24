import { Suspense, useRef, useState } from 'react';
import { useFrame } from 'react-three-fiber';
import { a, useSpring, useTransition } from '@react-spring/three';
import { EffectComposer, SSAO, SMAA } from '@react-three/postprocessing';
import { ContactShadows } from '@react-three/drei';
import { useTimeline } from '../store';

const BOXES_ARGS = [
  {
    args: [1.5, 1.5, 1.5],
    position: [-1.5, 1.5 / 2, 2.5],
    rotation: [0, -Math.PI / 64, 0],
    random: 3 * Math.random(),
  },
  {
    args: [3, 3, 3],
    position: [0, 3 / 2, 0],
    rotation: [0, 0, 0],
    random: 3 * Math.random(),
  },
  {
    args: [3.2, 3.2, 3.2],
    position: [4, 3.2 / 2 + 0.65, -0.5],
    rotation: [0, -Math.PI / 32, Math.PI / 4],
    random: 3 * Math.random(),
  },
];

function Box({ random, started, position, args, opacity, scale, spring }) {
  const mesh = useRef();
  const { rot } = useSpring({
    rot: spring.to([0, 100], [0, Math.PI * 2]),
  });
  useFrame((state) => {
    if (!(started && mesh.current)) return;
    mesh.current.position.y += (state.clock.getElapsedTime() * random) / 10000;
  });
  return (
    <a.mesh ref={mesh} position={position} rotation-x={rot} rotation-y={rot} scale={scale} receiveShadow castShadow>
      <boxBufferGeometry attach="geometry" args={args} />
      <a.meshStandardMaterial attach="material" transparent opacity={opacity} />
    </a.mesh>
  );
}

function FloatingBoxes(props) {
  const group = useRef();
  const [isEntered, setIsEntered] = useState(0);
  const increaseStep = useTimeline((s) => s.increaseStep);
  const transition = useTransition(BOXES_ARGS, {
    from: { opacity: 0, scale: [0.1, 0.1, 0.1] },
    enter: { opacity: 1, scale: [1, 1, 1] },
    leave: { opacity: 0, scale: [0.1, 0.1, 0.1] },
    trail: 200,
    onRest: () => setIsEntered((s) => s + 1),
  });
  const { x } = useSpring({
    from: { x: 0 },
    to: { x: 100 },
    config: {
      mass: 10,
      tension: 50,
      friction: 50,
    },
    pause: isEntered < 3,
    onRest: increaseStep,
  });
  const { posY, rotY } = useSpring({
    posY: x.to([0, 100], [0, 10]),
    rotY: x.to([0, 100], [0, Math.PI * 2]),
  });
  return (
    <a.group ref={group} {...props} position-y={posY} rotation-y={rotY}>
      {transition(({ opacity, scale }, data) => (
        <Box {...data} opacity={opacity} scale={scale} spring={x} started={isEntered === 3} material-color="red" />
      ))}
    </a.group>
  );
}

function Frame0() {
  return (
    <>
      <group position={[0, -4, 0]}>
        <FloatingBoxes position={[0, 0, 1]} />
        <Suspense fallback={null}>
          <ContactShadows rotation={[Math.PI / 2, 0, 0]} opacity={0.75} width={40} height={40} blur={1} far={9} />
        </Suspense>
      </group>
      <directionalLight castShadow position={[2.5, 12, 12]} intensity={4} />
      <pointLight position={[20, 20, 20]} />
      <pointLight position={[-20, -20, -20]} intensity={5} />
      <Suspense fallback={null}>
        <EffectComposer multisampling={0}>
          <SSAO intensity={60} luminanceInfluence={0.5} radius={10} scale={0.5} bias={0.5} />
          <SMAA edgeDetection={0.5} />
        </EffectComposer>
      </Suspense>
    </>
  );
}

export default Frame0;
