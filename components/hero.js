import React, { useEffect, useState } from 'react';
import 'styled-components/macro';
import { a, useSpring } from '@react-spring/web';

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

  const { visibility, ...maskProps } = useSpring({
    pause: paused,
    from: { scaleX: 0.001, scaleY: 0, opacity: 0, visibility: 'hidden' },
    to: async (animate) => {
      await wait(800);

      await animate({
        to: { scaleY: 1, opacity: 1 },
      });

      await animate({
        to: { scaleX: 1 },
        config: { tension: 90, mass: 1 },
      });

      await animate({
        to: { visibility: 'visible' },
      });

      await animate({
        to: { opacity: 0 },
      });
    },
  });

  return (
    <div className="outer-container h-screen relative">
      <div
        className="absolute bottom-0 left-0 right-0"
        css={`
          bottom: -1vw;
        `}>
        <a.div
          style={maskProps}
          className="bg-black absolute h-full w-full"
          css={`
            transform-origin: bottom left;
          `}
        />
        <a.div style={{ visibility }}>
          <img src="logo.svg" alt="Poimandres" className="w-full" />
        </a.div>
      </div>
    </div>
  );
}

export default Hero;
