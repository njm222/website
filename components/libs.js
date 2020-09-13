/**
 * @TODO Add dragging interaction to move the slider
 */
import React from 'react';
import 'styled-components/macro';

const libs = [
  {
    name: 'react-spring',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    name: 'react-three',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    name: 'jotai',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    name: 'react-three/flex',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

function LibCard({ name, desc, url }) {
  return (
    <a
      className="inline-block bg-milk rounded-lg p-12 max-w-sm"
      css={`
        height: 200px;
        box-shadow: -15px -15px 25px rgba(255, 255, 255, 0.5), 15px 15px 25px rgba(204, 204, 204, 0.5);
      `}
      href={`https://github.com/poimandres/${name}`}>
      <h3 className="font-bold text-lg mb-2">{name}</h3>
      <p className="text-gray leading-7">{desc}</p>
    </a>
  );
}

function Libs() {
  return (
    <div
      className="whitespace-no-wrap overflow-hidden"
      css={`
        margin-top: 100px;
        margin-bottom: 100px;
      `}>
      <div
        className="overflow-x-scroll py-8 pb-16"
        css={`
          padding-left: 20vw;
          padding-right: 20vw;
          margin-bottom: -2rem;
          -webkit-scrolling: touch;

          * {
            white-space: normal;
          }

          > * + * {
            margin-left: 50px;
          }
        `}>
        {libs.map((lib) => (
          <LibCard {...lib} key={lib.name} />
        ))}
      </div>
    </div>
  );
}

export default Libs;
