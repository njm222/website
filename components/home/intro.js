function Intro() {
  return (
    <>
      <div className="outer-container">
        <div className="lg:flex inner-container justify-between">
          <div className="max-w-md">
            <div className="font-bold mb-2 text-2xl lg:text-3xl">
              Creative frontend design & development toolkit for React
            </div>

            <div className="text-c050 leading-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a enim lacus. Vivamus bibendum lobortis
              ipsum, sit amet interdum enim. Donec et malesuada quam.
            </div>
          </div>

          <div className="text-sm leading-5 flex space-x-12 items-start mt-8 lg:mt-0">
            <a className="link" href="https://pmdnrs.com/github">
              Github
            </a>
            <a className="link" href="https://pmdnrs.com/twitter">
              Twitter
            </a>
            <a className="link" href="https://pmdnrs.com/discord">
              Discord
            </a>
          </div>
        </div>
      </div>
      <style jsx>{`
        .outer-container {
          margin-bottom: 100px;
          margin-top: 100px;
        }
      `}</style>
    </>
  );
}

export default Intro;
