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

  return (
    <div className="animalList">
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
            <div className="animalList-item-inner">
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
      <div className="animalList-add">
        <div className="animalList-add-inner">
          <IconTextButton
            height="25px"
            width="25px"
            text="Add new animal"
            onClick={() => props.showAnimalAddForm()}
          />
        </div>
      </div>
    </div>
  );
};

export default AnimalList;
