import React from "react";
import "./selectinput.css";

const SelectInput = (props) => {
  function checkIfFieldRequired(required) {
    if (required) {
      return <span style={{ color: "var(--status-error)" }}>*</span>;
    }
  }

  const prepareOptions = (type, list) => {
    if (type === "breed") {
      return list.map((breed, i) => (
        <option
          value={breed.id}
          label={breed.breedName + ", " + breed.species.speciesName}
          key={i}
        ></option>
      ));
    } else if (type === "gender") {
      return list.map((gender, i) => (
        <option value={gender.id} key={i}>
          {prepareGenderSign(gender.type)}
          {gender.type}
        </option>
      ));
    } else if (type === "house-trained") {
      return list.map((option, i) => (
        <option value={option.id} key={i}>
          {option.type}
        </option>
      ));
    } else if (type === "size") {
      return list.map((option, i) => (
        <option value={option.id} key={i}>
          {option.type}
        </option>
      ));
    } else if (type === "coat-length") {
      return list.map((option, i) => (
        <option value={option.id} key={i}>
          {option.type}
        </option>
      ));
    } else if (type === "species") {
      return list.map((option, i) => (
        <option value={option.id} key={i}>
          {option.speciesName}
        </option>
      ));
    } else if (type === "is-ready") {
      return list.map((option, i) => (
        <option value={option} key={i}>
          {option.toString()}
        </option>
      ));
    } else if (type === "default") {
      return list.map((option, i) => (
        <option value={option} key={i}>
          {option}
        </option>
      ));
    }
  };

  const prepareGenderSign = (gender) => {
    if (gender === "male") {
      return String.fromCharCode(9794) + " ";
    } else if (gender === "female") {
      return String.fromCharCode(9792) + " ";
    } else {
      return String.fromCharCode(9893) + " ";
    }
  };

  const prepareDefaultOption = (def) => {
    if (def !== undefined) {
      return <option value="DEFAULT">{def}</option>;
    } else {
      return <option value="DEFAULT">select an option </option>;
    }
  };

  return (
    <div className="selectInput">
      <div className="selectInput-label">
        <span>
          {props.label}
          {checkIfFieldRequired(props.isRequired)}
        </span>
      </div>
      <div className="selectInput-input">
        <select
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          style={{ width: props.width, height: props.height }}
          placeholder={"DEFAULT"}
          spellCheck="false"
          autoComplete="off"
        >
          {prepareDefaultOption(props.default)}
          {prepareOptions(props.type, props.list)}
        </select>
      </div>
    </div>
  );
};

export default SelectInput;
