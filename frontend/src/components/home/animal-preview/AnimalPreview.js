import React from "react";
import PublicHeader from "../../header/header-public/PublicHeader";
import AnimalAvatar from "../../avatar/animal/AnimalAvatar";
import { getAnimalDetails } from "../../../api/PublicApiFunctions";
import { formatDate } from "../../../functions/Functions";
import "./animalpreview.css";
import TextInput from "../../input/text/TextInput";
import TextInputExtended from "../../input/textarea/TextInputExtended";

const animalAvatarSize = { width: "230px", height: "230px" };

export default class AnimalPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animalId: props.match.params.id,
      animal: "",
      isReady: false,
    };
  }

  componentDidMount() {
    getAnimalDetails(this.state.animalId).then((res) => {
      this.setState({ animal: res.data, isReady: true });
    });
  }

  render() {
    return (
      <div className="animalPreview">
        <PublicHeader />
        <div className="animalPreview-left-container">
          <AnimalAvatar
            image={this.state.animal.avatar}
            width={animalAvatarSize.width}
            height={animalAvatarSize.height}
            name="animalAvatar"
          />
        </div>
        <div className="animalPreview-right-container">
          {this.state.isReady ? (
            <div className="animalPreview-right-container-info">
              <TextInput
                label="Name:"
                value={this.state.animal.name}
                readOnly={true}
                width="100%"
              />
              <TextInput
                label="Age:"
                value={this.state.animal.age}
                readOnly={true}
                width="100%"
              />
              <TextInput
                label="Size:"
                value={this.state.animal.size.type}
                readOnly={true}
                width="100%"
              />
              <TextInput
                label="Breed:"
                value={this.state.animal.breed.breedName}
                readOnly={true}
                width="100%"
              />
              <TextInput
                label="Gender:"
                value={this.state.animal.gender.type}
                readOnly={true}
                width="100%"
              />
              <TextInput
                label="Coat:"
                value={this.state.animal.coatLength.type}
                readOnly={true}
                width="100%"
              />
              <TextInput
                label="House trained:"
                value={this.state.animal.houseTrained.type}
                readOnly={true}
                width="100%"
              />
              <TextInput
                label="Identichip:"
                value={this.state.animal.identichip}
                readOnly={true}
                width="100%"
              />
              <TextInput
                label="Color:"
                value={this.state.animal.color}
                readOnly={true}
                width="100%"
              />
              <TextInput
                label="Arrived:"
                value={formatDate(this.state.animal.dateArrivedInShelter)}
                readOnly={true}
                width="100%"
              />
            </div>
          ) : (
            <div></div>
          )}
          <TextInputExtended
            label="comment"
            value={this.state.animal.comments}
            width="100%"
            height="100%"
            readOnly={true}
          />
        </div>
      </div>
    );
  }
}
