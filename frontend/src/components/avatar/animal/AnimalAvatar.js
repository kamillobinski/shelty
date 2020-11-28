import React from "react";
import "./animalavatar.css";

const AnimalAvatar = (props) => {
  return (
    <div className="animal-avatar-outer">
      <div
        className="animalAvatar"
        style={{ width: props.width, height: props.height }}
      >
        <div className="animalAvatar-inner">
          <img
            className="noselect"
            src={"http://localhost:8081/images/avatars/" + props.image}
            alt="animal"
          />
        </div>
      </div>
    </div>
  );
};

export default AnimalAvatar;
