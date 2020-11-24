import { createRef, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { a, config, useSpring } from '@react-spring/three';
import { EffectComposer, SSAO, SMAA } from '@react-three/postprocessing';
import { ContactShadows, OrthographicCamera, PerspectiveCamera, Text } from '@react-three/drei';
import { useInverseBlending, useTimeline } from '../store';
import { useThree } from 'react-three-fiber';
import * as THREE from 'three';

const BOXES_ANIMATION = [
  [
    {
      posX: -10,
      scaleX: 0.3,
      scaleY: 7,
      scaleZ: 1,
    },
    {
      posX: -5,
      scaleX: 0.3,
      scaleY: 7,
      scaleZ: 1,
    },
    {
      posX: 0,
      scaleX: 0.3,
      scaleY: 7,
      scaleZ: 1,
    },
    {
      posX: 5,
      scaleX: 0.3,
      scaleY: 7,
      scaleZ: 1,
    },
    {
      posX: 10,
      scaleX: 0.3,
      scaleY: 7,
      scaleZ: 1,
    },
    {
      posX: 0,
      scaleX: 0,
      scaleY: 0,
      scaleZ: 0,
    },
  ],
  [
    {
      scaleX: 2.5,
      scaleZ: 2.5,
    },
    {
      scaleX: 2.5,
      scaleZ: 2.5,
    },
    {
      scaleX: 2.5,
      scaleZ: 2.5,
    },
    {
      scaleX: 2.5,
      scaleZ: 2.5,
    },
    {
      scaleX: 2.5,
      scaleZ: 2.5,
    },
    {
      posX: 10,
    },
  ],
  [
    {
      posX: -12,
      posY: -1,
      posZ: 5,
      scaleX: 5,
      scaleY: 5,
      scaleZ: 5,
      rotY: Math.random() * 3 * Math.PI,
    },
    {
      posX: -18,
      posY: -2.5,
      posZ: -2,
      scaleX: 2,
      scaleY: 2,
      scaleZ: 2,
      rotY: Math.random() * 3 * Math.PI,
    },
    {
      posX: 3,
      posY: -1.25,
      posZ: -13,
      scaleX: 4.5,
      scaleY: 4.5,
      scaleZ: 4.5,
      rotY: Math.random() * 3 * Math.PI,
    },
    {
      posX: 13.5,
      posY: -1.85,
      posZ: -5,
      scaleX: 3.3,
      scaleY: 3.3,
      scaleZ: 3.3,
      rotY: Math.random() * 3 * Math.PI,
    },
    {
      posX: 20.6,
      posY: -2.6,
      posZ: 6,
      scaleX: 1.8,
      scaleY: 1.8,
      scaleZ: 1.8,
      rotY: Math.random() * 3 * Math.PI,
    },
    {
      posX: -20.6,
      posY: 0,
      posZ: -6,
      scaleX: 1,
      scaleY: 1,
      scaleZ: 1,
    },
  ],
  [
    {
      posX: 12,
      posZ: -5,
      rotY: Math.random() * 3 * Math.PI,
    },
    {
      posX: 8,
      posZ: 2,
      rotY: Math.random() * 3 * Math.PI,
    },
    {
      posX: -10,
      posZ: 8,
      rotY: Math.random() * 3 * Math.PI,
    },
    {
      posX: 0.5,
      posZ: 7,
      rotY: Math.random() * 3 * Math.PI,
    },
    {
      posX: -18.6,
      posZ: -7,
      rotY: Math.random() * 3 * Math.PI,
    },
    {
      posX: 18.6,
      posZ: 3,
      rotY: Math.random() * 3 * Math.PI,
    },
  ],
  [
    {
      posX: -10,
      posZ: -2,
      rotY: Math.random() * 3 * Math.PI,
    },
    {
      posX: -18,
      posZ: 5,
      rotY: Math.random() * 3 * Math.PI,
    },
    {
      posX: -1,
      posZ: -12,
      rotY: Math.random() * 3 * Math.PI,
    },
    {
      posX: 3.5,
      posZ: 9,
      rotY: Math.random() * 3 * Math.PI,
    },
    {
      posX: 7.6,
      posZ: -3,
      rotY: Math.random() * 3 * Math.PI,
    },
    {
      posX: 10.6,
      posZ: -2,
      rotY: Math.random() * 3 * Math.PI,
    },
  ],
];

function MagicPrimitives(props) {
  const { animationRef, isSphere } = props;
  const [springProps] = useSpring(() => ({
    ref: animationRef,
    posX: 0,
    posY: 0,
    posZ: 0,
    scaleX: 0,
    scaleY: 0,
    scaleZ: 0,
    rotY: 0,
  }));
  return (
    <a.mesh
      position-x={springProps.posX}
      position-y={springProps.posY}
      position-z={springProps.posZ}
      scale-x={springProps.scaleX}
      scale-y={springProps.scaleY}
      scale-z={springProps.scaleZ}
      rotation-x={springProps.rotX}
      rotation-y={springProps.rotY}
      rotation-z={springProps.rotZ}>
      {isSphere ? <sphereBufferGeometry args={[1, 32, 32]} /> : <boxBufferGeometry />}
      <meshStandardMaterial />
    </a.mesh>
  );
}

function Frame4() {
  const cameraRef = useRef();
  const { camera } = useThree();
  const [text, setText] = useState('');
  const increaseStep = useTimeline((s) => s.increaseStep);
  const setInverse = useInverseBlending((s) => s.setInverse);
  const boxRefs = useMemo(() => new Array(BOXES_ANIMATION[0].length).fill().map(createRef), []);

  const { posY, posZ } = useSpring({
    from: {
      posY: 0,
      posZ: 15,
    },
    to: {
      posY: 20,
      posZ: 0,
    },
    delay: 6000,
    onChange: () => cameraRef.current.lookAt(0, 0, 0),
  });

  useEffect(() => {
    boxRefs.forEach(
      async (boxRef, index) => await boxRef.current.start({ config: config.molasses, ...BOXES_ANIMATION[0][index] })
    );
    setTimeout(
      () =>
        boxRefs.forEach(
          async (boxRef, index) => await boxRef.current.start({ config: config.molasses, ...BOXES_ANIMATION[1][index] })
        ),
      3000
    );
    setTimeout(() => {
      boxRefs.forEach(
        async (boxRef, index) => await boxRef.current.start({ config: config.molasses, ...BOXES_ANIMATION[2][index] })
      );
      setText('reusable');
    }, 6000);
    setTimeout(() => {
      boxRefs.forEach(
        async (boxRef, index) => await boxRef.current.start({ config: config.molasses, ...BOXES_ANIMATION[3][index] })
      );
      setText('React');
    }, 9000);
    setTimeout(() => {
      boxRefs.forEach(
        async (boxRef, index) => await boxRef.current.start({ config: config.molasses, ...BOXES_ANIMATION[4][index] })
      );
      setText('components');
    }, 12000);
  }, [boxRefs]);

  useEffect(() => setInverse(false), [setInverse]);

  return (
    <>
      <group>
        {boxRefs.map((ref, index) => (
          <MagicPrimitives isSphere={index === boxRefs.length - 1} animationRef={ref} key={`0${index}`} index={index} />
        ))}
        <group rotation={[-Math.PI / 2, 0, 0]} position={[0, 10, 0]}>
          <Text
            font="https://cdn.jsdelivr.net/npm/inter-ui/Inter%20(web)/Inter-Bold.woff2"
            fontSize={2}
            color="#000"
            outlineColor="#000"
            outlineWidth={0.03}>
            {text}
          </Text>
        </group>
        <ContactShadows
          position={[0, -3.5, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          opacity={0.5}
          width={300}
          height={300}
          blur={1}
          far={20}
        />
      </group>
      <a.primitive ref={cameraRef} position-y={posY} position-z={posZ} object={camera} dispose={null} />
      <directionalLight castShadow position={[2.5, 12, -50]} intensity={4} />
      <pointLight position={[-20, -20, -50]} intensity={5} />
      <Suspense fallback={null}>
        <EffectComposer multisampling={0}>
          <SSAO intensity={60} luminanceInfluence={0.5} radius={10} scale={0.5} bias={0.5} />
          <SMAA edgeDetection={0.5} />
        </EffectComposer>
      </Suspense>
    </>
  );
}

export default Frame4;
