import React from "react";
import { SettingsIcon, DeleteIcon } from "../../utils/icons/Icons";
import "./iconbutton.css";

const ICON_HEIGHT = "16px";
const ICON_WIDTH = "16px";
const ICON_FILL = "rgb(0, 0, 0, 0.7)";

const IconButton = (props) => {
  const handleIconType = (type) => {
    if (type === "settings") {
      return (
        <SettingsIcon
          height={ICON_HEIGHT}
          width={ICON_WIDTH}
          fill={ICON_FILL}
        />
      );
    } else if (type === "delete-user") {
      return (
        <DeleteIcon height={ICON_HEIGHT} width={ICON_WIDTH} fill={ICON_FILL} />
      );
    }
  };

  return (
    <div
      className="iconButton"
      onClick={props.onClick}
      style={{
        width: props.width,
        height: props.height,
      }}
    >
      <div
        className={"iconButton-icon " + (props.rotate ? "rotate" : "")}
        style={{ height: ICON_HEIGHT }}
      >
        {handleIconType(props.type)}
      </div>
    </div>
  );
};

export default IconButton;
