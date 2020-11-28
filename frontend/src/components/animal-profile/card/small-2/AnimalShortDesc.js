import React from "react";
import "./animalshortdesc.css";

var defaultName = "none";

const AnimalShortDesc = (props) => {
  return (
    <div className="animalShortDesc">
      <div className="animalShortDesc-name">
        <span>{props.name || defaultName}</span>
      </div>
      <div className="animalShortDesc-description">
        <span>{props.description || defaultName}</span>
      </div>
    </div>
  );
};

export default AnimalShortDesc;
