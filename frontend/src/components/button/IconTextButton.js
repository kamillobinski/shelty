import React from "react";
import { AddIcon } from "../../utils/icons/Icons";
import "./icontextbutton.css";

const ICON_HEIGHT = "11px";
const ICON_FILL = "black";

const IconTextButton = (props) => {
  return (
    <div className="iconTextButton" onClick={props.onClick}>
      <div
        className="iconTextButton-inner"
        style={{
          width: props.width,
          height: props.height,
        }}
      >
        <div
          className="iconTextButton-inner-icon"
          style={{ height: ICON_HEIGHT }}
        >
          <AddIcon height={ICON_HEIGHT} fill={ICON_FILL} />
        </div>
        <div className="iconTextButton-inner-text">
          <span>{props.text}</span>
        </div>
      </div>
    </div>
  );
};

export default IconTextButton;
