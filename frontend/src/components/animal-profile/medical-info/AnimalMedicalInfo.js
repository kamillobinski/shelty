import React from "react";
import CategoryTitle from "../../block/CategoryTitle";
import TextInput from "../../input/text/TextInput";
import "./animalmedicalinfo.css";

const AnimalMedicalInformation = (props) => {
  return (
    <div className="animalMedicalInformation">
      <div className="animalMedicalInformation-category">
        <CategoryTitle title="Medical information" />
      </div>
      <div className="animalMedicalInformation-inputs">
        <TextInput
          label="Grafting date:"
          name="animalGraftingDate"
          value={props.graftingDate}
          onChange={props.handleInputChange}
          width="100%"
          type="date"
        />
        <TextInput
          label="Deworming date:"
          name="animalDewormingDate"
          value={props.dewormingDate}
          onChange={props.handleInputChange}
          width="100%"
          type="date"
        />
        <TextInput
          label="Sterilization date:"
          name="animalSterilizationDate"
          value={props.sterilizationDate}
          onChange={props.handleInputChange}
          width="100%"
          type="date"
        />
      </div>
    </div>
  );
};

export default AnimalMedicalInformation;
