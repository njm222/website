import React, { useEffect, useRef } from 'react';
import { a, useSpring } from '@react-spring/web';

function CursorIcon() {
  return <></>;
}

function Cursor() {
  const cursorRef = useRef();
  const [{ x, y }, animate] = useSpring(() => ({ x: 0, y: 0 }));

  useEffect(() => {
    function handleMouse(e) {
      const { clientX, clientY } = e;
      animate({ x: clientX, y: clientY });
    }

    window.addEventListener('mousemove', handleMouse);

    return () => window.removeEventListener('mousemove', handleMouse);
  }, [animate]);

  return (
    <>
      <a.div
        ref={cursorRef}
        style={{ x, y, pointerEvents: 'none' }}
        className="fixed z-10 top-0 left-0 border-2 w-4 h-4">
        <CursorIcon />
      </a.div>
    </>
  );
}

export default Cursor;
