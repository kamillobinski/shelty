import React from "react";
import TextInput from "../../input/text/TextInput";
import CategoryTitle from "../../block/CategoryTitle";
import SelectInput from "../../input/select/SelectInput";
import "./animalgeneralinfo.css";

const AnimalGeneralInfo = (props) => {
  return (
    <div className="animalGeneralInfo">
      <div className="animalGeneralInfo-category">
        <CategoryTitle title="General information" />
      </div>
      <div className="animalGeneralInfo-inputs">
        <TextInput
          label="Name:"
          name="animalName"
          value={props.name}
          onChange={props.handleInputChange}
          width="100%"
          isRequired={true}
        />
        <TextInput
          label="Identichip:"
          name="animalIdentichip"
          value={props.identichip}
          onChange={props.handleInputChange}
          width="100%"
        />
        <TextInput
          label="Age:"
          name="animalAge"
          value={props.age}
          onChange={props.handleInputChange}
          width="100%"
          isRequired={true}
        />
        <TextInput
          label="Date of birth:"
          name="animalDateOfBirth"
          value={props.animalDateOfBirth}
          onChange={props.handleInputChange}
          width="100%"
          height="30px"
          type="date"
        />
        <SelectInput
          label="Size:"
          type="size"
          name="animalSize"
          value={props.size}
          onChange={props.handleSelectChange}
          list={props.sizeList}
          width="100%"
          isRequired={true}
        />
        <TextInput
          label="Color"
          name="animalColor"
          value={props.color}
          onChange={props.handleInputChange}
          width="100%"
        />
        <TextInput
          label="Date arrived"
          name="animalDateArrivedInShelter"
          value={props.dateArrivedInShelter}
          onChange={props.handleInputChange}
          width="100%"
          type="date"
        />
        <TextInput
          label="Date adopted"
          name="animalDateAdopted"
          value={props.dateAdopted}
          onChange={props.handleInputChange}
          width="100%"
          type="date"
        />
        <SelectInput
          label="Breed"
          width="100%"
          type="breed"
          name="animalBreed"
          value={props.breed}
          onChange={props.handleSelectChange}
          list={props.breedList}
          isRequired={true}
        />
        <SelectInput
          label="Gender"
          width="100%"
          type="gender"
          name="animalGender"
          value={props.gender}
          onChange={props.handleSelectChange}
          list={props.genderList}
          isRequired={true}
        />
        <SelectInput
          label="Coat length"
          width="100%"
          type="coat-length"
          name="animalCoatLength"
          value={props.coatLength}
          onChange={props.handleSelectChange}
          list={props.coatLengthList}
          isRequired={true}
        />
        <SelectInput
          label="House-trained"
          width="100%"
          type="house-trained"
          name="animalHouseTrained"
          value={props.houseTrained}
          onChange={props.handleSelectChange}
          list={props.houseTrainedOptionList}
          isRequired={true}
        />
        <SelectInput
          label="Ready to be adopted"
          width="100%"
          type="is-ready"
          name="animalIsReady"
          value={props.isReady}
          onChange={props.handleSelectChange}
          list={props.isReadyOptions}
          isRequired={true}
        />
      </div>
    </div>
  );
};

export default AnimalGeneralInfo;
