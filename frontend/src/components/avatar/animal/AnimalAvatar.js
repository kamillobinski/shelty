import React from "react";
import { ANIMAL_AVATAR_ROUTE } from '../../../api/Api';
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
            src={ANIMAL_AVATAR_ROUTE + props.image}
            alt="animal"
          />
        </div>
      </div>
    </div>
  );
};

export default AnimalAvatar;
