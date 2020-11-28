import React from "react";
import "./defaultavatar.css";

const DefaultAvatar = (props) => {
  const handleImageType = (type, image, id) => {
    if (type === "animal") {
      return (
        <img
          id={id}
          className="noselect"
          src={"http://localhost:8081/images/avatars/" + image}
          alt="animal"
        />
      );
    } else if (type === "user") {
      return (
        <img
          id={id}
          className="noselect"
          src={"http://localhost:8081/images/user/avatars/" + image}
          alt="user"
        />
      );
    }
  };

  return (
    <div
      className="def-avatar"
      style={{ width: props.width, height: props.height, margin: props.margin }}
    >
      {handleImageType(props.type, props.image, props.id)}
    </div>
  );
};

export default DefaultAvatar;
