import React from 'react';
import 'styled-components/macro';

function Intro() {
  return (
    <div
      className="outer-container"
      css={`
        margin-top: 100px;
        margin-bottom: 100px;
      `}>
      <div className="flex inner-container justify-between">
        <div className=" max-w-md">
          <div className="text-3xl font-bold mb-2">Creative frontend design & development toolkit for React</div>

          <div className="text-gray leading-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a enim lacus. Vivamus bibendum lobortis ipsum,
            sit amet interdum enim. Donec et malesuada quam.
          </div>
        </div>

        <div className="text-sm leading-5 flex space-x-12 items-start">
          <a className="link" href="#">
            Github
          </a>
          <a className="link" href="#">
            Twitter
          </a>
          <a className="link" href="#">
            Discord
          </a>
        </div>
      </div>
    </div>
  );
}

export default Intro;
