import { useEffect, useRef, useState } from 'react';
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
      scrollTop: 0,
    },
    to: async (animate) => {
      await wait(800);

      await animate({
        to: { scaleY: 1 },
      });

      await animate({
        to: { scaleX: 1 },
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
      });

      await wait(800);

      await animate({
        to: { opacity: 0 },
      });
    },
  });

  return (
    <>
      {/* loading */}
      <a.div className="bg-c100 w-screen h-screen fixed z-10 top-0 left-0 pointer-events-none" style={{ opacity }}>
        <div className="outer-container h-screen relative text-c005">
          <div className="absolute bottom-0 left-0 right-0">
            <a.div style={maskProps} className="bg-c000 absolute h-full w-full" />
            <a.div style={{ visibility }} className="text-c005">
              <Logo />
            </a.div>
          </div>
        </div>
      </a.div>

      {/* title */}
      <div className="outer-container h-screen relative">
        <div className="absolute bottom-0 left-0 right-0">
          <Logo />
        </div>
      </div>
    </>
  );
}

export default Hero;
