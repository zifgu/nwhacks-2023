import React from "react";
import './WelcomePage.css';

export function WelcomePage({onStart}) {
  return (
    <div className="main">
      <h1>Who  Will  You  Be?
        <div className="roller">
          <span className="rolltext">
            PROGRAMMER<br/>
            DOCTOR<br/>
            ARTIST<br/>
            <span className="role-text">LET'S FIND OUT</span><br/>
          </span>
        </div>
      </h1>
      <button onClick={onStart}>
        <div className="arrow">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
    </div>
  );
}