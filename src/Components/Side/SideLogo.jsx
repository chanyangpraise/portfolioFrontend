import React from 'react';
import './SideLogo.css';

function SideLogo() {
  return (
    <div>
      <a href="/main">
        <img
          className="sidebar_header"
          src="/src/asset/Teamstagramlogo.png"
        ></img>
      </a>
    </div>
  );
}

export default SideLogo;
