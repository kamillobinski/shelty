import React from "react";
import AnimalAvatar from "../../../avatar/animal/AnimalAvatar";
import CategoryTitle from "../../../block/CategoryTitle";
import AnimalShortDesc from "../small-2/AnimalShortDesc";
import PrimaryButton from "../../../button/PrimaryButton";

import "./defaultanimalcard.css";
import AvatarInput from "../../../input/image/avatar/AvatarInput";

const animalAvatarSize = { width: "130px", height: "130px" };

const uploadAvatarButton = { text: "Upload New Avatar", type: "dark" };
const saveButton = { text: "Save", type: "light" };
const deleteButton = { text: "Delete Animal", type: "light" };

const DefaultAnimalCard = (props) => {
  return (
    <div className="animal-card-default">
      <CategoryTitle title="Animal profile" />
      <AnimalAvatar
        image={props.avatar}
        width={animalAvatarSize.width}
        height={animalAvatarSize.height}
        name="animalAvatar"
      />
      <div className="animal-card-default-description">
        <AnimalShortDesc name={props.name} description={props.description} />
      </div>
      <div className="animal-card-default-buttons">
        <AvatarInput
          text={uploadAvatarButton.text}
          type={uploadAvatarButton.type}
          handleChange={props.handleAvatarChange}
          name="animalAvatar"
        />
        <PrimaryButton
          text={saveButton.text}
          type={saveButton.type}
          onClick={() => props.updateAnimal()}
        />
        <PrimaryButton
          text={deleteButton.text}
          type={deleteButton.type}
          onClick={() => props.deleteAnimal()}
        />
      </div>
    </div>
  );
};

export default DefaultAnimalCard;
