import { Canvas } from 'react-three-fiber';
import { Loader } from 'drei/prototyping/Loader';
import { useState } from "react"

import Scenes from './scenes';

function Intro() {
  const [clicked, setClicked] = useState(0)

  return (
    <div className="intro fixed left-0 top-0 right-0 w-screen h-screen TO_DECOMMENT-z-10">
      <Canvas
        colorManagement
        camera={{ position: [0, 0, 15], near: 0.1, far: 100 }}
        gl={{ powerPreference: 'high-performance', antialias: false, stencil: false, depth: false, alpha: false }}
        onCreated={({ gl }) => gl.setClearColor('#ffffff')}
        pixelRatio={1}
        onClick={() => setClicked(s => (s + 1) % 3)}
        shadowMap>
        <color attach="background" args={['white']} />

        {/* lights */}
        <ambientLight intensity={0.8} />

        {/* scenes */}
        <Scenes index={clicked} />
      </Canvas>

      <Loader />
    </div>
  );
}

export default Intro;
