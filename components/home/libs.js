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
      <a className="block bg-c005 dark:bg-c095 rounded-lg p-12 max-w-sm" href={`https://github.com/pmndrs/${name}`}>
        <h3 className="font-bold text-lg mb-2">{name}</h3>
        <p className="text-sm text-050 leading-7">{desc}</p>
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
        <div className="cards overflow-x-scroll py-8 pb-16">
          {libs.map((lib) => (
            <div key={lib.name} className="inline-block">
              <LibCard {...lib} />
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .card-container {
          margin-top: 100px;
          margin-bottom: 100px;
        }

        .cards {
          padding-left: 20vw;
          padding-right: 20vw;
          margin-bottom: -2rem;
          -webkit-scrolling: touch;
        }

        .cards * {
          white-space: normal;
        }

        .cards > * + * {
          margin-left: 50px;
        }
      `}</style>
    </>
  );
}

export default Libs;
