import React from "react";
import { Link } from "react-router-dom";

function Start() {
  return (
    <div>
      start page
      <Link to="/play/maze">start maze</Link>
    </div>
  );
}

export default Start;
