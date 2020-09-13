import React, { useEffect, useState } from 'react';
import 'styled-components/macro';
import { a, useSpring } from '@react-spring/web';
import Logo from './logo';

function wait(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

function Hero() {
  const [paused, set] = useState(true);

  useEffect(() => {
    set(false);
  }, []);

  const { visibility, opacity, ...maskProps } = useSpring({
    pause: paused,
    from: {
      scaleX: 0.001,
      scaleY: 0,
      opacity: 1,
      visibility: 'hidden',
      transformOrigin: 'bottom left',
      abc: 1,
    },
    to: async (animate) => {
      await wait(800);

      await animate({
        to: { scaleY: 1 },
      });

      await animate({
        to: { scaleX: 1 },
        config: { tension: 90, mass: 1 },
      });

      await animate({
        to: { transformOrigin: 'bottom right' },
        immediate: true,
      });

      await animate({
        to: { visibility: 'visible' },
      });

      await animate({
        to: { scaleX: 0 },
        config: { tension: 90, mass: 1 },
      });

      await animate({
        to: { opacity: 0 },
      });
    },
  });

  return (
    <a.div className="bg-black w-screen  h-screen fixed z-10 top-0 left-0" style={{ opacity }}>
      <div className="outer-container h-screen relative">
        <div
          className="absolute bottom-0 left-0 right-0"
          css={`
            bottom: -1vw;
          `}>
          <a.div
            style={maskProps}
            className="bg-white absolute h-full w-full"
            css={`
              transform-origin: bottom left;
            `}
          />
          <a.div style={{ visibility }} className="text-white">
            <Logo />
          </a.div>
        </div>
      </div>
    </a.div>
  );
}

export default Hero;
