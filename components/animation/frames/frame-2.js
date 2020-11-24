import { forwardRef, Suspense, useEffect, useCallback, useMemo, useRef, useState } from 'react';
import { a, useSpring, useTransition } from '@react-spring/three';
import { EffectComposer, SSAO, SMAA } from '@react-three/postprocessing';
import { ContactShadows } from '@react-three/drei';
import { useInverseBlending, useTimeline } from '../store';

const BOXES_ARGS = [
  {
    args: [1.5, 1.5, 1.5],
    position: [-1.5, 1.5 / 2, 2.5],
    rotation: [0, -Math.PI / 64, 0],
  },
  {
    args: [3, 3, 3],
    position: [0, 3 / 2, 0],
    rotation: [0, 0, 0],
  },
  {
    args: [3.2, 3.2, 3.2],
    position: [4, 3.2 / 2 + 0.65, -0.5],
    rotation: [0, -Math.PI / 32, Math.PI / 4],
  },
];

function Box({ position, rotation, args, spring }) {
  const mesh = useRef();
  const { rotX, rotY, rotZ } = useSpring({
    rotX: spring.to([0, 100], [Math.PI * 2, rotation[0]]),
    rotY: spring.to([0, 100], [Math.PI * 2, rotation[1]]),
    rotZ: spring.to([0, 100], [Math.PI * 2, rotation[2]]),
  });
  return (
    <a.mesh
      ref={mesh}
      position={position}
      rotation-x={rotX}
      rotation-y={rotY}
      rotation-z={rotZ}
      receiveShadow
      castShadow>
      <boxBufferGeometry attach="geometry" args={args} />
      <meshStandardMaterial attach="material" />
    </a.mesh>
  );
}

function FloatingBoxes(props) {
  const group = useRef();
  const increaseStep = useTimeline((s) => s.increaseStep);
  const updateOnProgress = useCallback(function updateOnProgress(progress) {
    const { setInverse } = useInverseBlending.getState();
    setInverse(Math.sin((progress / 100) * 4 * Math.PI) < 0);
  }, []);
  const { x } = useSpring({
    from: { x: 0 },
    to: { x: 100 },
    config: {
      mass: 10,
      tension: 50,
      friction: 80,
    },
    onChange: ({ x }) => updateOnProgress(x),
    onRest: increaseStep,
  });
  const { posY, rotY } = useSpring({
    posY: x.to([0, 100], [15, 0]),
    rotY: x.to([0, 100], [Math.PI * 2, 0]),
  });
  return (
    <a.group ref={group} {...props} position-y={posY} rotation-y={rotY}>
      {BOXES_ARGS.map((data, index) => (
        <Box key={`0${index}`} {...data} spring={x} />
      ))}
    </a.group>
  );
}

function Frame2() {
  return (
    <>
      <group position={[0, -4, 0]}>
        <FloatingBoxes position={[0, 0, 1]} />
        <ContactShadows rotation={[Math.PI / 2, 0, 0]} opacity={0.75} width={40} height={40} blur={1} far={20} />
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

export default Frame2;
