import React from "react";
import CategoryTitle from "../../block/CategoryTitle";
import {
  formatDateToDisplay
} from "../../../functions/Functions";
import "./animalmedicalinfo.css";
import { addMedicalHistoryItem, deleteMedicalHistoryItem, updateMedicalHistoryItemStatus } from '../../../api/AnimalApiFunctions';

class AnimalMedicalInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputDate: "",
      inputType: "",
      inputVet: "",
      inputIsCompleted: false,
    };
    this.saveMedicalHistoryItem = this.saveMedicalHistoryItem.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.deleteMedicalHistoryItem = this.deleteMedicalHistoryItem.bind(this);
    this.updateMedicalHistoryItemStatus = this.updateMedicalHistoryItemStatus.bind(this);
  }

  componentDidMount() {

  }

  saveMedicalHistoryItem() {
    addMedicalHistoryItem(this.props.animalId, this.state.inputType, this.state.inputVet, this.state.inputDate, this.state.inputIsCompleted).then(() => {
      this.props.refreshPage();
      this.setState({
        inputDate: "",
        inputType: "",
        inputVet: "",
        inputIsCompleted: false,
      })
    })
  }

  deleteMedicalHistoryItem(id) {
    deleteMedicalHistoryItem(id).then(() => {
      this.props.refreshPage();
    })
  }

  updateMedicalHistoryItemStatus(event, id) {
    updateMedicalHistoryItemStatus(id, event.target.checked).then(() => {
      this.props.refreshPage();
    })
  }

  handleInputChange(event) {
    if (event.target.name === "inputIsCompleted") {
      this.setState({ [event.target.name]: event.target.checked });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  render() {
    const historyList = Object.values(this.props.medicalHistory);
    return (
      <div className="animalMedicalInformation" >
        <div className="animalMedicalInformation-category">
          <CategoryTitle title="Medical information" />
        </div>
        <div className="animalMedicalInformation-inputs">
          {/*<TextInput
            label="Grafting date:"
            name="animalGraftingDate"
            value={this.props.graftingDate}
            onChange={this.props.handleInputChange}
            width="100%"
            type="date"
          />
          <TextInput
            label="Deworming date:"
            name="animalDewormingDate"
            value={this.props.dewormingDate}
            onChange={this.props.handleInputChange}
            width="100%"
            type="date"
          />
          <TextInput
            label="Sterilization date:"
            name="animalSterilizationDate"
            value={this.props.sterilizationDate}
            onChange={this.props.handleInputChange}
            width="100%"
            type="date"
          />*/}
          <table style={{ width: "100%", textAlign: "left", fontFamily: "var(--primary-font)", fontSize: "15px" }}>
            {historyList.map((history, i) => (
              <tr>
                <td><input type="checkbox" checked={history.completed} onChange={(event) => this.updateMedicalHistoryItemStatus(event, history.id)} /></td>
                <td>{formatDateToDisplay(history.date)}</td>
                <td>{history.type}</td>
                <td>{history.vet}</td>
                <td><button width="100%" onClick={() => this.deleteMedicalHistoryItem(history.id)}>Delete</button></td>
              </tr>
            ))}
            <tr>
              <td><input type="checkbox" name="inputIsCompleted" checked={this.state.inputIsCompleted} onChange={this.handleInputChange} ></input></td>
              <td><input style={{ width: "100%" }} type="date" name="inputDate" value={this.state.inputDate} onChange={this.handleInputChange}></input></td>
              <td><input style={{ width: "100%" }} placeholder="type" name="inputType" value={this.state.inputType} onChange={this.handleInputChange}></input></td>
              <td><input style={{ width: "100%" }} placeholder="vet" name="inputVet" value={this.state.inputVet} onChange={this.handleInputChange}></input></td>
              <td><button width="100%" onClick={() => this.saveMedicalHistoryItem()}>Save</button></td>
            </tr>
          </table>
        </div>
      </div >
    );
  }
};

export default AnimalMedicalInformation;
