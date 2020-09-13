import React, { useEffect, useRef } from 'react';
import 'styled-components/macro';
import { a, useSpring } from '@react-spring/web';

function CursorIcon() {
  return (
    <svg viewBox="0 0 12 12" className="w-full">
      <path
        d="M1.2819426,-5.17920154e-17 L10.7180574,5.17920154e-17 C11.1638168,-3.00926524e-17 11.3254599,0.0464128056 11.4884229,0.133566352 C11.6513858,0.220719898 11.7792801,0.348614185 11.8664336,0.511577148 C11.9535872,0.674540111 12,0.83618323 12,1.2819426 L12,10.7180574 C12,11.1638168 11.9535872,11.3254599 11.8664336,11.4884229 C11.7792801,11.6513858 11.6513858,11.7792801 11.4884229,11.8664336 C11.3254599,11.9535872 11.1638168,12 10.7180574,12 L1.2819426,12 C0.83618323,12 0.674540111,11.9535872 0.511577148,11.8664336 C0.348614185,11.7792801 0.220719898,11.6513858 0.133566352,11.4884229 C0.0464128056,11.3254599 2.00617683e-17,11.1638168 -3.45280103e-17,10.7180574 L3.45280103e-17,1.2819426 C-2.00617683e-17,0.83618323 0.0464128056,0.674540111 0.133566352,0.511577148 C0.220719898,0.348614185 0.348614185,0.220719898 0.511577148,0.133566352 C0.674540111,0.0464128056 0.83618323,3.00926524e-17 1.2819426,-5.17920154e-17 Z"
        id="Rectangle"
        fill="#F2F2F2"></path>
    </svg>
  );
}

function Cursor() {
  const cursorRef = useRef();
  const [{ x, y }, animate] = useSpring(() => ({ x: 0, y: 0 }));

  useEffect(() => {
    function handleMouse(e) {
      const { clientX, clientY } = e;
      // cursorRef.current.style.transform = `translateX(${clientX}px) translateY(${clientY}px)`;
      animate({ x: clientX, y: clientY });
    }

    window.addEventListener('mousemove', handleMouse);

    return () => window.removeEventListener('mousemove', handleMouse);
  });

  return (
    <a.div
      ref={cursorRef}
      style={{ x, y }}
      className="fixed z-10 top-0 left-0 border-2"
      css={`
        pointer-events: none;
        width: 12px;
        height: 12px;
      `}>
      <CursorIcon />
    </a.div>
  );
}

export default Cursor;
