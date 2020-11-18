import { Canvas } from 'react-three-fiber';
import { useEffect } from 'react';
import clsx from 'clsx';
import { Loader } from '@react-three/drei';
import { a, useSpring } from '@react-spring/web';

import Scenes from './three-scenes';
import DomScenes from './dom-scenes';
import { useInverseBlending, useTimeline } from '../store';

function Intro() {
  const { isThreeFrame, increaseStep } = useTimeline((s) => s);
  const inverseBlending = useInverseBlending((s) => s.inverse);

  const { blendingFactor, opacity } = useSpring({
    blendingFactor: inverseBlending ? 1 : 0,
    opacity: isThreeFrame ? 1 : 0,
  });

  useEffect(() => {
    window.addEventListener('click', increaseStep);
    return () => window.removeEventListener('click', increaseStep);
  }, [increaseStep]);

  return (
    <div className={`w-screen h-screen ${inverseBlending ? 'bg-c100' : 'bg-c000'}`}>
      <a.div className={clsx('fixed inset-0')} style={{ opacity }}>
        <Canvas
          camera={{ position: [0, 0, 15], near: 0.1, far: 1000 }}
          gl={{ powerPreference: 'high-performance', antialias: false, stencil: false, depth: false, alpha: false }}
          onCreated={({ gl }) => gl.setClearColor('#ffffff')}
          pixelRatio={2}
          shadowMap>
          <color attach="background" args={['white']} />
          <ambientLight intensity={0.8} />
          <Scenes />
        </Canvas>

        <Loader />
      </a.div>
      <a.div className="fixed inset-0 z-10 font-sans" style={{ opacity: opacity.to((x) => 1 - x) }}>
        <DomScenes />
      </a.div>
      <a.div
        className={clsx('fixed inset-0 z-20')}
        style={{ mixBlendMode: 'difference', background: blendingFactor.to((x) => `rgba(255, 255, 255, ${x})`) }}
      />
    </div>
  );
}

export default Intro;
