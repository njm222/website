import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import { a, useSpring } from '@react-spring/three';
import { Text } from 'drei';
import { BlurPass, EffectComposer, KernelSize, RenderPass, Resizable, Resizer } from 'postprocessing';
import { HalfFloatType } from 'three';

const FONT_PROPS = {
  font: 'https://cdn.jsdelivr.net/npm/inter-ui/Inter%20(web)/Inter-SemiBold.woff',
  fontSize: 4,
};

function easeInCubic(x) {
  return x * x * x;
}

function useBlur() {
  const { gl, scene, size, camera } = useThree();

  const [composer, blurPass] = useMemo(() => {
    const composer = new EffectComposer(gl, {
      frameBufferType: HalfFloatType,
    });
    const renderPass = new RenderPass(scene, camera);
    const blurPass = new BlurPass({ width: size.width, height: size.height, kernelSize: KernelSize.HUGE });
    composer.addPass(renderPass);
    composer.addPass(blurPass);
    return [composer, blurPass];
  }, [gl, scene, camera]);

  useEffect(() => void composer.setSize(size.width, size.height), [composer, size]);
  useFrame((_, delta) => void composer.render(delta), 1);
  return blurPass;
}

function Title({ label = '', ...props }) {
  const group = useRef();
  return (
    <group {...props} ref={group}>
      <Text name={label} {...FONT_PROPS} material-color="#000">
        {label}
      </Text>
    </group>
  );
}

function TextSwapping(props) {
  const [isEntered, setIsEntered] = useState(false);
  const blur = useBlur();

  const updateBlur = useCallback(
    function updateBlur(progress) {
      blur.scale = progress > 70 ? easeInCubic((progress - 70) / 30) : 0;
    },
    [blur]
  );

  const [{ x }, animate] = useSpring(() => ({
    x: 0,
    config: {
      mass: 10,
      tension: 50,
      friction: 100,
    },
    onRest: () => setIsEntered(true),
    onChange: updateBlur,
  }));
  const { posZ } = useSpring({
    posZ: x.to([0, 100], [-200, 5]),
  });
  useEffect(() => {
    animate({ cancel: true });
    animate({ x: isEntered ? 0 : 100 });
  }, [isEntered]);
  return (
    <a.group {...props} position-z={posZ}>
      {isEntered ? <Title label="Open source toolkit for:" /> : <Title label="Poimandres" />}
    </a.group>
  );
}

function Frame2() {
  return (
    <>
      <TextSwapping />
      <pointLight position={[20, 20, 20]} />
      <pointLight position={[-20, -20, -20]} intensity={5} />
    </>
  );
}

export default Frame2;
