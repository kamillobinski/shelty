import React from "react";
import CategoryTitle from "../../block/CategoryTitle";
import TextInputExtended from "../../input/textarea/TextInputExtended";
import "./animalmedicaldescription.css";

const AnimalMedicalDescription = (props) => {
  return (
    <div className="animalMedicalDescription">
      <div className="animalMedicalDescription-category">
        <CategoryTitle title="Medical description" />
      </div>
      <div className="animalMedicalDescription-input">
        <TextInputExtended
          width="100%"
          height="100%"
          name="animalMedicalDescription"
          value={props.description}
          onChange={props.handleInputChange}
        />
      </div>
    </div>
  );
};

export default AnimalMedicalDescription;
