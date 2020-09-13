import React from 'react';
import 'styled-components/macro';

function LibCard() {
  return (
    <div
      className="inline-block bg-milk rounded-lg p-12 max-w-sm"
      css={`
        height: 200px;
        box-shadow: -15px -15px 25px rgba(255, 255, 255, 0.5), 15px 15px 25px rgba(204, 204, 204, 0.5);
      `}>
      <h3 className="font-bold text-lg mb-2">React Spring</h3>

      <p className="text-gray leading-7">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
  );
}

function Libs() {
  return (
    <div className="outer-container whitespace-no-wrap">
      <div
        className="overflow-x-hidden py-8"
        css={`
          * {
            white-space: normal;
          }

          > * + * {
            margin-left: 50px;
          }
        `}>
        <LibCard />
        <LibCard />
        <LibCard />
        <LibCard />
      </div>
    </div>
  );
}

export default Libs;
