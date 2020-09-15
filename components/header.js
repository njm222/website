function NavigationExamples() {
  return (
    <>
      <svg width="15" height="15" viewBox="0 0 15 15" className="fill-current">
        <circle cx="12.5" cy="12.5" r="2" />
        <circle cx="2.5" cy="12.5" r="2" />
        <circle cx="12.5" cy="2.5" r="2" />
        <circle cx="2.5" cy="2.5" r="2" />
      </svg>
    </>
  );
}

function NavigationDocs() {
  return (
    <>
      <div>Docs</div>
    </>
  );
}

function Header() {
  return (
    <>
      <header>
        <div className="fixed left-0 top-0 right-0">
          <div className="outer-container relative">
            <div className="inner-container">
              <div className="header flex justify-between items-center">
                <div>
                  <NavigationExamples />
                </div>

                <div>
                  <NavigationDocs />
                </div>
              </div>
              <style jsx>{`
                .header {
                  height: 100px;
                }
              `}</style>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
