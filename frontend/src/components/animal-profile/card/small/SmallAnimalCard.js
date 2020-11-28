import React from "react";
import "./smallanimalcard.css";

const SmallAnimalCard = (props) => {
  return (
    <div className="animal-card-small">
      <div
        className="animal-card-small-name"
        style={{ marginLeft: props.margin }}
      >
        <span>{props.name}</span>
      </div>
      <div
        className="animal-card-small-breed"
        style={{ marginLeft: props.margin }}
      >
        <span>{props.breed}</span>
      </div>
    </div>
  );
};

export default SmallAnimalCard;
