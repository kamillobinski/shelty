import React from "react";
import "./primarybutton.css";

const PrimaryButton = (props) => {
  function defineButtonBackground(type) {
    switch (type) {
      case "dark": {
        return "var(--primary-black)";
      }
      case "light": {
        return "#eff2f5";
      }
      case "red": {
        return "#ED5E68";
      }
    }
  }

  function defineButtonTextColor(type) {
    switch (type) {
      case "dark": {
        return "var(--primary-white)";
      }
      case "light": {
        return "var(--primary-black)";
      }
      case "red": {
        return "var(--primary-white";
      }
    }
  }

  return (
    <div
      className="primaryButton"
      style={{
        backgroundColor: defineButtonBackground(props.type),
        width: props.width,
      }}
      onClick={props.onClick}
    >
      <span style={{ color: defineButtonTextColor(props.type) }}>
        {props.text}
      </span>
    </div>
  );
};

export default PrimaryButton;
