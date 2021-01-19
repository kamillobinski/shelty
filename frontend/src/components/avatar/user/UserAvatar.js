import React from "react";
import { USER_AVATAR_ROUTE } from '../../../api/Api';
import "./useravatar.css";

const UserAvatar = (props) => {
  return (
    <div className="userAvatar-outer">
      <div
        className="userAvatar"
        style={{ width: props.width, height: props.height }}
      >
        <div className="userAvatar-inner">
          <img
            className="noselect"
            src={USER_AVATAR_ROUTE + props.image}
            alt="user"
          />
        </div>
      </div>
    </div>
  );
};

export default UserAvatar;
