import { useCallback, useEffect, useMemo, useRef, useState, forwardRef } from 'react';
import { a, useSpring, useTransition } from '@react-spring/web';
import { useTimeline } from '../store';

function Text({ parentAnimation }) {
  const ref = useRef([]);
  const [textIndex, setTextIndex] = useState(-1);
  const increaseStep = useTimeline((s) => s.increaseStep);
  const pages = ['2D', '3D', '3D Animation', 'AR/VR/XR', 'Flex spec in 3D', 'and more'].map((text) => ({ style }) => (
    <a.span className="absolute w-full pl-4 text-c100" style={style}>
      {text}
    </a.span>
  ));

  const transition = useTransition(textIndex, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      mass: 0.1,
      friction: 8,
    },
  });

  useEffect(() => {
    ref.current = new Array(pages.length + 1).fill().map((_, index) =>
      setTimeout(() => {
        if (index === pages.length) {
          increaseStep();
        } else {
          setTextIndex(index);
          if (index === pages.length - 1) {
            parentAnimation();
          }
        }
      }, index * 400)
    );
  }, [setTextIndex, parentAnimation]);

  return transition((style) => {
    if (textIndex < 0) return null;
    const Page = pages[textIndex];
    return <Page style={style} />;
  });
}

export default function Frame3() {
  const ref = useRef();
  const [isEnded, setEnded] = useState(false);
  const [{ x, color }] = useSpring(() => ({
    from: { x: 0, color: '#000' },
    to: async (animate) => {
      await animate({
        to: { x: 1.75 },
      }),
        await animate({
          to: { x: -1, color: '#999' },
          delay: 10,
          onRest: () => setEnded(true),
        });
    },
    delay: 10,
    config: {
      friction: 50,
    },
  }));

  const [{ opacity }] = useSpring(() => ({
    ref,
    opacity: 1,
  }));

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-c000 text-2xl">
      <a.div className="relative" style={{ transform: x.to((x) => `translateX(${x * 50}%)`) }}>
        <a.span style={{ color, opacity }}>Open source toolkit for:</a.span>
        {isEnded && <Text parentAnimation={async () => await ref.current.start({ opacity: 0 })} />}
      </a.div>
    </div>
  );
}
