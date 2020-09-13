import React from 'react';
import 'styled-components/macro';

function Stroke({ children }) {
  return (
    <div>
      <div
        aria-hidden={true}
        className="font-bold absolute z-1"
        css={`
          -webkit-text-stroke-color: #999;
          -webkit-text-stroke-width: 4px;
        `}>
        {children}
      </div>
      <div className="font-bold relative z-10 text-c005">{children}</div>
    </div>
  );
}

function Numbers() {
  return (
    <div
      className="outer-container"
      css={`
        margin-top: 100px;
        margin-bottom: 100px;
      `}>
      <div className="inner-container flex justify-between">
        <div className="text-5xl">
          <Stroke>20M+</Stroke>
        </div>

        <div className="text-5xl">
          <Stroke>30K+</Stroke>
        </div>

        <div className="text-5xl">
          <Stroke>121</Stroke>
        </div>
      </div>
    </div>
  );
}

export default Numbers;
