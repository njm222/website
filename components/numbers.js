function Stroke({ children }) {
  return (
    <>
      <div>
        <div aria-hidden={true} className="number font-bold absolute z-1">
          {children}
        </div>
        <div className="font-bold relative z-10 text-c005 dark:text-c095">{children}</div>
      </div>
      <style jsx>{`
        .number {
          -webkit-text-stroke-color: #cccccc;
          -webkit-text-stroke-width: 4px;
        }
      `}</style>
    </>
  );
}

function Numbers() {
  return (
    <>
      <div className="number__container outer-container">
        <div className="inner-container flex justify-between">
          <div className="text-5xl">
            <Stroke>20M+</Stroke>
          </div>

          <div className="text-5xl">
            <Stroke>30K+</Stroke>
          </div>

          <div className="text-5xl">
            <Stroke>100+</Stroke>
          </div>
        </div>
      </div>
      <style jsx>{`
        .number_container {
          margin-top: 100px;
          margin-bottom: 100px;
        }
      `}</style>
    </>
  );
}

export default Numbers;
