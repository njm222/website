import React from 'react';
import 'styled-components/macro';

function NavigationExamples() {
  return (
    <svg width="26" height="20" viewBox="0 0 26 20" className="fill-current">
      <circle cx="23.5" cy="17.5" r="2.5" />
      <circle cx="8.5" cy="17.5" r="2.5" />
      <circle cx="23.5" cy="2.5" r="2.5" />
      <circle cx="8.5" cy="2.5" r="2.5" />
    </svg>
  );
}

function NavigationDocs() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" className="fill-current">
      <rect width="28" height="28" fill="url(#pattern0)" />
      <defs>
        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use href="#image0" transform="scale(0.03125)" />
        </pattern>
        <image
          id="image0"
          width="32"
          height="32"
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAApElEQVRYhe2WwQrDIAyGv5U+wyh9or4/o7KrPsh6mF56GDHG1kF+CHoIyWcSIeAaWBuQgE+F7cBiBRArkxcLVhAlYI1vsITQADyBV76/gfVqACwhtABmEC0A8J2BMhN7bwDJj+kKsAkgugKo40wGCZp0O8Bc6S9tyUMa8O8qIH5ZLwBvwZAtaILyFtxeAQf4BZDyqVnNz3tAQiHJkiGxmGO5xtQBBnl9+MZ91nEAAAAASUVORK5CYII="
        />
      </defs>
    </svg>
  );
}

function Header() {
  return (
    <header>
      <div className="fixed left-0 top-0 right-0">
        <div className="outer-container relative">
          <div className="inner-container">
            <div
              className="flex justify-between items-center"
              css={`
                height: 150px;
              `}>
              <div>
                <NavigationExamples />
              </div>

              <div>
                <NavigationDocs />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
