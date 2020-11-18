import { useEffect, useRef, useState } from 'react';
import { a, useSpring } from '@react-spring/web';
import { useTimeline } from '../store';

function Frame1() {
  const ref = useRef();
  const [isBack, setIsBack] = useState(false);
  const increaseStep = useTimeline((s) => s.increaseStep);
  const [{ x, opacity }, animate] = useSpring(() => ({
    ref,
    x: 0,
    opacity: 1,
  }));

  useEffect(async () => {
    await ref.current.start({
      x: 1,
      config: {
        duration: 5000,
      },
      onRest: () => setIsBack(true),
    });
    await animate({
      x: 0,
      config: {
        duration: 5000,
      },
    });
    await animate({ opacity: 0 });
    increaseStep();
  }, [setIsBack, increaseStep]);

  return (
    <div className="absolute inset-0 flex justify-center items-center bg-c000 text-2xl">
      <a.div
        style={{
          scale: x.to((x) => 1 + x * 2),
          textShadow: x.to((x) => {
            const shadow = x > 0.5 ? (x - 0.5) * 200 : 0;
            const color = x > 0.5 ? (255 * (x - 0.5)) / 0.5 : 0;
            return `rgb(${color}, ${color}, ${color}) 0px 0px ${shadow}px`;
          }),
          color: 'transparent',
          opacity,
        }}>
        {isBack ? 'Open source toolkit for:' : 'Poimandres'}
      </a.div>
    </div>
  );
}

export default Frame1;
