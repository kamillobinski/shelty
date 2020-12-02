import React from "react";
import "./textinputextended.css";

const TextInputExtended = (props) => {
  return (
    <div className="textInputExtended">
      <div className="textInputExtended-input">
        <textarea
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          style={{ width: props.width, height: props.height }}
          spellCheck="false"
          autoComplete="off"
          readOnly={props.readOnly}
        />
      </div>
    </div>
  );
};

export default TextInputExtended;
