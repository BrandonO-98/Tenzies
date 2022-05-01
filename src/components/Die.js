import React from "react";
import "./Die.css";

function Die(props) {
  return (
    <div
      className={`die-container ${
        props.obj.isStatic ? "die-container-static" : "die-container-dynamic"
      }`}
      onClick={props.holdFunc}
    >
      {props.obj.value}
    </div>
  );
}

export default Die;
