import React from "react";
import CategoryTitle from "../../block/CategoryTitle";
import TextInputExtended from "../../input/textarea/TextInputExtended";
import "./animalgeneraldescription.css";

const AnimalGeneralDescription = (props) => {
  return (
    <div className="animalGeneralDescription">
      <div className="animalGeneralDescription-category">
        <CategoryTitle title="General description" />
      </div>
      <div className="animalGeneralDescription-input">
        <TextInputExtended
          width="100%"
          height="100%"
          name="animalComments"
          value={props.comments}
          onChange={props.handleInputChange}
        />
      </div>
    </div>
  );
};

export default AnimalGeneralDescription;
