import React from "react";
import TextInput from "../../input/text/TextInput";
import SelectInput from "../../input/select/SelectInput";
import {
  getBreedOptions,
  getSpeciesOptions,
  addBreedOption,
  deleteBreedOption,
} from "../../../api/AnimalApiFunctions";
import "./editbreed.css";
import PrimaryButton from "../../button/PrimaryButton";
import StatusMessageHandler from "../../status-message/StatusMessageHandler";

class EditBreed extends React.Component {
  constructor() {
    super();
    this.state = {
      breedList: [],
      speciesList: [],
      breed: "",
      species: "",

      shouldShowStatusMessage: false,
      statusMessage: "",
      statusMessageType: "",
    };
    this.addBreed = this.addBreed.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getInitialData = this.getInitialData.bind(this);
    this.hideStatusMessage = this.hideStatusMessage.bind(this);
    this.clearForm = this.clearForm.bind(this);
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
  }

  clearForm() {
    this.setState({ breed: "", species: "" });
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  hideStatusMessage() {
    this.setState({ shouldShowStatusMessage: false });
  }

  addBreed(breed, species) {
    addBreedOption(breed, species)
      .then(() => {
        this.setState({
          shouldShowStatusMessage: true,
          statusMessageType: "success",
          statusMessage: "Breed has been added",
        });
        this.clearForm();
        this.getInitialData();
      })
      .catch(() => {
        this.setState({
          shouldShowStatusMessage: true,
          statusMessageType: "error",
          statusMessage: "An error occurred while adding breed",
        });
      });
  }

  deleteExistingBreed(id) {
    deleteBreedOption(id)
      .then(() => {
        this.setState({
          shouldShowStatusMessage: true,
          statusMessageType: "success",
          statusMessage: "Breed has been deleted",
        });
        this.getInitialData();
      })
      .catch(() => {
        this.setState({
          shouldShowStatusMessage: true,
          statusMessageType: "error",
          statusMessage: "An error occurred while deleting breed",
        });
      });
  }

  render() {
    return (
      <div className="editBreed">
        <div className="editBreed-inner">
          <TextInput
            label="Breed name:"
            width="100%"
            name="breed"
            value={this.state.breed}
            onChange={this.handleInputChange}
          />
          <SelectInput
            label="Species name:"
            width="100%"
            name="species"
            type="species"
            list={this.state.speciesList}
            value={this.state.species}
            onChange={this.handleInputChange}
          />
          <PrimaryButton
            text="Add"
            width="100px"
            type="light"
            onClick={() => this.addBreed(this.state.breed, this.state.species)}
          />
          <div className="editBreed-inner-list">
            {this.state.breedList.map((breed, i) => (
              <div className="editBreed-inner-list-item" key={i}>
                <TextInput
                  key={breed.id}
                  type="text"
                  label={"Breed #" + i}
                  name="breed"
                  value={breed.breedName + " - " + breed.species.speciesName}
                  width="100%"
                  height="30px"
                  margin="0 120px 0 0"
                  readOnly={true}
                />
                <div className="editBreed-inner-list-item-delete-btn">
                  <PrimaryButton
                    text="Remove"
                    width="100px"
                    type="red"
                    onClick={() => this.deleteExistingBreed(breed.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <StatusMessageHandler
          shouldShowStatusMessage={this.state.shouldShowStatusMessage}
          statusMessageType={this.state.statusMessageType}
          statusMessage={this.state.statusMessage}
          updateStateOnClose={this.hideStatusMessage}
        />
      </div>
    );
  }
}

export default EditBreed;
