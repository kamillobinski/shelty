import React from "react";
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
            src={"http://localhost:8081/images/user/avatars/" + props.image}
            alt="user"
          />
        </div>
      </div>
    </div>
  );
};

export default UserAvatar;
