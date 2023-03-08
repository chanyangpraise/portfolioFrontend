import React from "react";
import "./Loader.scss";

function Loader() {
  return (
    <div className="loader">
      <h2>
        <div className="loader_roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </h2>
    </div>
  );
}

export default Loader;
