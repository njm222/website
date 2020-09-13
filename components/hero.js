import React from 'react';
import 'styled-components/macro';
import Logo from './logo';

function Hero() {
  return (
    <div className="outer-container h-screen relative">
      <div className="absolute bottom-0 left-0 right-0">
        <div>
          <Logo />
        </div>
      </div>
    </div>
  );
}

export default Hero;
