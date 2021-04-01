import React from "react";
import PublicHeader from "../../header/header-public/PublicHeader";
import SelectInput from "../../input/select/SelectInput";
import TextInput from "../../input/text/TextInput";
import {
  getBreedOptionsForSpecificSpecies,
  getBreedOptions,
  getSpeciesOptions,
  getLatestAnimals,
} from "../../../api/PublicApiFunctions";
import { filterFinderList } from "../../../functions/Functions";
import "./animalfinder.css";
import PrimaryButton from "../../button/PrimaryButton";
import TitleHeader from '../../header/header-title/TitleHeader';
import AnimalGrid from "../../animal-grid/AnimalGrid";

export default class AnimalFinder extends React.Component {
  constructor() {
    super();
    this.state = {
      age: "",
      color: "Any",
      species: "",
      breed: "",
      gender: "",
      home: "",
      size: "",

      ageList: ["Puppy", "Young", "Adult", "Senior"],
      speciesList: [],
      breedList: [],
      genderList: ["Male", "Female"],
      sizeList: ["Small", "Medium", "Large"],
      homeList: ["flat", "house"],

      animalList: [],
      resultList: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getInitialData = this.getInitialData.bind(this);
    this.getResults = this.getResults.bind(this);
  }

  componentDidMount() {
    this.getInitialData();
  }

  getInitialData() {
    getBreedOptions().then((res) => {
      this.setState({ breedList: res.data });
    });
    getSpeciesOptions().then((res) => {
      this.setState({ speciesList: res.data });
    });
    getLatestAnimals().then((res) => {
      this.setState({ animalList: res.data });
      this.getResults(
        this.state.animalList,
        this.state.age,
        this.state.color,
        this.state.species,
        this.state.breed,
        this.state.gender,
        this.state.size
      );
    });
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });

    if (event.target.name === "species") {
      if (event.target.value === "DEFAULT") {
        getBreedOptions().then((res) => {
          this.setState({ breedList: res.data });
        });
      } else {
        getBreedOptionsForSpecificSpecies(event.target.value).then((res) => {
          this.setState({ breedList: res.data });
        });
      }
    }
  }

  getResults(list, age, color, species, breed, gender, size) {
    var result = filterFinderList(
      list,
      age,
      color,
      species,
      breed,
      gender,
      size
    );
    this.setState({ resultList: result });
  }

  render() {
    return (
      <div className="animalFinder">
        <div className="animalFinder-inner">
          <PublicHeader />
          <TitleHeader title="Animal finder" description="Find the most suitable pet" />
          <div className="animalFinder-form">
            <SelectInput
              label="Age:"
              type="default"
              name="age"
              onChange={this.handleInputChange}
              list={this.state.ageList}
              width="100%"
              default="Any"
            />
            <TextInput
              label="Color:"
              name="color"
              value={this.state.color}
              onChange={this.handleInputChange}
              width="100%"
            />
            <SelectInput
              label="Species:"
              type="species"
              name="species"
              onChange={this.handleInputChange}
              list={this.state.speciesList}
              width="100%"
              default="Any"
            />
            <SelectInput
              label="Breed:"
              type="breed"
              name="breed"
              onChange={this.handleInputChange}
              list={this.state.breedList}
              width="100%"
              default="Any"
            />
            <SelectInput
              label="Gender:"
              type="default"
              name="gender"
              onChange={this.handleInputChange}
              list={this.state.genderList}
              width="100%"
              default="Any"
            />
            <SelectInput
              label="Size:"
              type="default"
              name="size"
              onChange={this.handleInputChange}
              list={this.state.sizeList}
              width="100%"
              default="Any"
            />
            <div className="animalFinder-form-submit">
              <PrimaryButton
                text="Search"
                width="110px"
                height="55px"
                type="dark"
                onClick={() =>
                  this.getResults(
                    this.state.animalList,
                    this.state.age,
                    this.state.color,
                    this.state.species,
                    this.state.breed,
                    this.state.gender,
                    this.state.size
                  )
                }
              />
            </div>
          </div>
          <div id="result">
            <AnimalGrid animalList={this.state.resultList} />
          </div>
        </div>
      </div>
    );
  }
}
