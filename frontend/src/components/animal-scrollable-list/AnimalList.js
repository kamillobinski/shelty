import React from "react";
import DefaultAvatar from "../avatar/default/DefaultAvatar";
import AnimalProfileSmall from "../animal-profile/card/small/SmallAnimalCard";
import IconTextButton from "../button/IconTextButton";
import "./animallist.css";

const AnimalList = (props) => {
  const checkIfListItemIsActive = (id) => {
    if (props.clickedItem === id) {
      return true;
    } else {
      return false;
    }
  };

  const checkIfListIsExpanded = () => {
    if (props.isListExpanded) {
      return "<"
    } else {
      return ">"
    }
  }

  const checkIfAnimalReady = (animal) => {
    if (animal.ready) {
      return animal.ready;
    } else if (!animal.ready) {
      if (animal.dateAdopted !== null) {
        return " adopted"
      } else {
        return " not-ready"
      }
    }
  }

  return (
    <div className="animalList" id="animalList">
      <div className="animalList-inner">
        {props.list &&
          !!props.list &&
          props.list.map((animal, i) => (
            <div
              className={
                "animalList-item " +
                (checkIfListItemIsActive(animal.id) ? " active" : "")
              }
              key={i}
              id={animal.id}
              onClick={() => props.handleClick(animal.id)}
            >
              <div className={"animalList-item-inner " + checkIfAnimalReady(animal)}>
                <DefaultAvatar
                  height="43px"
                  width="43px"
                  image={animal.avatar}
                  type="animal"
                />
                <AnimalProfileSmall
                  name={animal.name}
                  breed={
                    animal.breed.breedName +
                    " · " +
                    animal.breed.species.speciesName
                  }
                  margin="55px"
                />
              </div>
            </div>
          ))}
        {!!props.list.length ? null : (
          <div className="animalList-empty">
            <span>
              Could not find animals, if it does not change, please check the
              database connection.
            </span>
          </div>
        )}
      </div>
      <div className="animalList-add" id="animalList-add">
        <div className="animalList-add-inner">
          <IconTextButton
            height="25px"
            width="25px"
            text="Add new animal"
            onClick={() => props.showAnimalAddForm()}
          />
        </div>
        <button className="test" onClick={props.expandList} title="Expand list"><span>{checkIfListIsExpanded()}</span></button>
      </div>
    </div>
  );
};

export default AnimalList;
