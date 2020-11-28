import React from "react";
import PublicHeader from "../../header/header-public/PublicHeader";
import AnimalProfileSmall from "../../animal-profile/card/small/SmallAnimalCard";
import { getLatestAnimals } from "../../../api/PublicApiFunctions";
import "./animals.css";
import PrimaryButton from "../../button/PrimaryButton";

const ANIMAL_AVATAR_URL = "http://localhost:8081/images/avatars/";

class Animals extends React.Component {
  constructor() {
    super();
    this.state = { animals: [] };
    this.getInitialData = this.getInitialData.bind(this);
  }

  componentDidMount() {
    this.getInitialData();
  }

  getInitialData() {
    getLatestAnimals().then((res) => {
      this.setState({ animals: res.data });
    });
  }

  render() {
    return (
      <div className="animals">
        <PublicHeader />
        <div className="animals-list">
          {this.state.animals.map((animal, i) => (
            <div className="animals-list-item">
              <div
                className="animals-list-item-image"
                style={{
                  backgroundImage:
                    "url(" + ANIMAL_AVATAR_URL + animal.avatar + ")",
                }}
              ></div>
              <AnimalProfileSmall
                name="Shilla"
                breed={
                  animal.breed.breedName +
                  " · " +
                  animal.breed.species.speciesName
                }
                margin="0"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Animals;
