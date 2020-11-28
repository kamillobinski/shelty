import React from "react";
import "./textinput.css";

const TextInput = (props) => {
  function checkIfFieldRequired(required) {
    if (required) {
      return <span style={{ color: "var(--status-error)" }}>*</span>;
    }
  }

  return (
    <div className="textInput" style={{ margin: props.margin }}>
      <div className="textInput-label">
        <span>
          {props.label}
          {checkIfFieldRequired(props.isRequired)}
        </span>
      </div>
      <div className="textInput-input">
        <input
          type={props.type}
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

export default TextInput;
