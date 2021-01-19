import React from "react";
import { ANIMAL_AVATAR_ROUTE, USER_AVATAR_ROUTE } from '../../../api/Api';
import "./defaultavatar.css";

const DefaultAvatar = (props) => {
  const handleImageType = (type, image, id) => {
    if (type === "animal") {
      return (
        <img
          id={id}
          className="noselect"
          src={ANIMAL_AVATAR_ROUTE + image}
          alt="animal"
        />
      );
    } else if (type === "user") {
      return (
        <img
          id={id}
          className="noselect"
          src={USER_AVATAR_ROUTE + image}
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
