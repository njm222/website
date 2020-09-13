/**
 * @TODO Add dragging interaction to move the slider
 * @TODO Resolve styled component for .cards #48
 */
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
    <>
      <a className="inline-block bg-c005 rounded-lg p-12 max-w-sm" href={`https://github.com/pmndrs/${name}`}>
        <h3 className="font-bold text-lg mb-2">{name}</h3>
        <p className="text-050 leading-7">{desc}</p>
      </a>
      <style jsx>{`
        a {
          height: 200px;
          box-shadow: -15px -15px 25px rgba(255, 255, 255, 0.5), 15px 15px 25px rgba(204, 204, 204, 0.5);
        }
      `}</style>
    </>
  );
}

function Libs() {
  return (
    <>
      <div className="card-container whitespace-no-wrap overflow-hidden">
        <div
          className="cards overflow-x-scroll py-8 pb-16"
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
      <style jsx>{`
        .card-container {
          margin-top: 100px;
          margin-bottom: 100px;
        }
      `}</style>
    </>
  );
}

export default Libs;
