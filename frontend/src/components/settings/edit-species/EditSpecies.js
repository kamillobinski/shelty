import React from "react";
import {
  getSpeciesOptions,
  addSpeciesOption,
  deleteSpeciesOption,
} from "../../../api/AnimalApiFunctions";
import PrimaryButton from "../../button/PrimaryButton";
import TextInput from "../../input/text/TextInput";
import StatusMessageHandler from "../../status-message/StatusMessageHandler";
import "./editspecies.css";

class EditSpecies extends React.Component {
  constructor() {
    super();
    this.state = {
      species: "",
      speciesList: [],

      shouldShowStatusMessage: false,
      statusMessage: "",
      statusMessageType: "",
    };
    this.getInitialData = this.getInitialData.bind(this);
    this.deleteExistingSpecies = this.deleteExistingSpecies.bind(this);
    this.addSpecies = this.addSpecies.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.hideStatusMessage = this.hideStatusMessage.bind(this);
  }

  componentDidMount() {
    this.getInitialData();
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  clearForm() {
    this.setState({ species: "" });
  }

  hideStatusMessage() {
    this.setState({ shouldShowStatusMessage: false });
  }

  getInitialData() {
    getSpeciesOptions().then((res) => {
      this.setState({ speciesList: res.data });
    });
  }

  addSpecies(name) {
    addSpeciesOption(name)
      .then(() => {
        this.setState({
          shouldShowStatusMessage: true,
          statusMessageType: "success",
          statusMessage: "Species has been added",
        });
        this.clearForm();
        this.getInitialData();
      })
      .catch(() => {
        this.setState({
          shouldShowStatusMessage: true,
          statusMessageType: "error",
          statusMessage: "An error occurred while adding species",
        });
      });
  }

  deleteExistingSpecies(id) {
    deleteSpeciesOption(id)
      .then(() => {
        this.setState({
          shouldShowStatusMessage: true,
          statusMessageType: "success",
          statusMessage: "Species has been deleted",
        });
        this.getInitialData();
      })
      .catch(() => {
        this.setState({
          shouldShowStatusMessage: true,
          statusMessageType: "error",
          statusMessage: "An error occurred - species already in use",
        });
      });
  }

  render() {
    return (
      <div className="editSpecies">
        <div className="editSpecies-inner">
          <TextInput
            label="Species name:"
            width="100%"
            name="species"
            value={this.state.species}
            onChange={this.handleInputChange}
          />
          <PrimaryButton
            text="Add"
            width="100px"
            type="light"
            onClick={() => this.addSpecies(this.state.species)}
          />
          <div className="editSpecies-inner-list">
            {this.state.speciesList.map((species, i) => (
              <div className="editSpecies-inner-list-item" key={i}>
                <TextInput
                  type="text"
                  label={"Species #" + i}
                  name="breed"
                  value={species.speciesName}
                  width="100%"
                  height="30px"
                  margin="0 120px 0 0"
                  readOnly={true}
                />
                <div className="editSpecies-inner-list-item-delete-btn">
                  <PrimaryButton
                    text="Remove"
                    width="100px"
                    type="red"
                    onClick={() => this.deleteExistingSpecies(species.id)}
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

export default EditSpecies;
