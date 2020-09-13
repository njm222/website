import React, { useEffect, useRef, useState } from 'react';
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

  const svgIconRef = useRef();

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
      svgIconRef.current.querySelectorAll('circle')[0].classList.add('text-white');

      await wait(800);

      svgIconRef.current.querySelectorAll('circle')[1].classList.add('text-white');

      await animate({
        to: { scaleY: 1 },
      });

      await animate({
        to: { scaleX: 1 },
      });

      svgIconRef.current.querySelectorAll('circle')[2].classList.add('text-white');

      await animate({
        to: { transformOrigin: 'bottom right' },
        immediate: true,
      });

      await animate({
        to: { visibility: 'visible' },
      });

      await animate({
        to: { scaleX: 0 },
      });

      svgIconRef.current.querySelectorAll('circle')[3].classList.add('text-white');

      await wait(800);

      await animate({
        to: { opacity: 0 },
      });
    },
  });

  return (
    <a.div className="bg-black w-screen  h-screen fixed z-10 top-0 left-0" style={{ opacity }}>
      <div className="outer-container h-screen relative text-milk">
        <div
          className="flex justify-between items-center"
          css={`
            height: 150px;
          `}>
          <div className="font-bold">
            <svg
              ref={svgIconRef}
              width="26"
              height="20"
              viewBox="0 0 26 20"
              className="fill-current text-black"
              xmlns="http://www.w3.org/2000/svg">
              <circle cx="23.5" cy="17.5" r="2.5" />
              <circle cx="8.5" cy="17.5" r="2.5" />
              <circle cx="23.5" cy="2.5" r="2.5" />
              <circle cx="8.5" cy="2.5" r="2.5" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <a.div
            style={maskProps}
            className="bg-white absolute h-full w-full"
            css={`
              transform-origin: bottom left;
            `}
          />
          <a.div style={{ visibility }} className="text-milk">
            <Logo />
          </a.div>
        </div>
      </div>
    </a.div>
  );
}

export default Hero;
