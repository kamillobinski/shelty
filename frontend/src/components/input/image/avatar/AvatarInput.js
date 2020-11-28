import React from "react";
import PrimaryButton from "../../../button/PrimaryButton";
import "./avatarinput.css";

const AvatarInput = (props) => {
  const handleClick = () => {
    document.getElementById("hiddenAvatarInput").click();
  };

  return (
    <div
      className="avatarInput"
      onClick={() => handleClick()}
      style={{ width: props.width }}
    >
      <PrimaryButton text={props.text} type={props.type} />
      <div className="avatarInput-input">
        <input
          type="file"
          id="hiddenAvatarInput"
          name={props.name}
          onChange={props.handleChange}
        />
      </div>
    </div>
  );
};

export default AvatarInput;
