import React from "react";

// Components
import SearchHeader from "../../components/header/header-search/SearchHeader";
import AnimalList from "../../components/animal-scrollable-list/AnimalList";
import StatusMessageHandler from "../../components/status-message/StatusMessageHandler";
import DefaultAnimalCard from "../../components/animal-profile/card/default/DefaultAnimalCard";
import AnimalGeneralInfo from "../../components/animal-profile/general-info/AnimalGeneralInfo";
import AnimalImages from "../../components/animal-profile/gallery/AnimalImages";
import AnimalGeneralDescription from "../../components/animal-profile/general-description/AnimalGeneralDescription";
import AnimalMedicalInfo from "../../components/animal-profile/medical-info/AnimalMedicalInfo";
import AnimalMedicalDescription from "../../components/animal-profile/medical-description/AnimalMedicalDescription";

// Api
import { getUserIdFromCookie, getUserAvatar } from "../../api/UserApiFunctions";
import {
  deleteAnimal,
  updateAnimalAvatar,
  deleteGalleryImages,
  deleteGalleryImage,
  getAnimalGalleryImages,
  addAnimalGalleryImage,
  updateAnimal,
  getAnimal,
  getAnimals,
  getGenderOptions,
  getBreedOptions,
  getHouseTrainedOptions,
  getSizeOptions,
  getCoatLengthOptions,
  saveMedicalData,
  getMedicalData,
  addNewAnimal,
  getAnimalId,
  setAnimalAvatarFromGalleryImage,
  getMedicalHistory
} from "../../api/AnimalApiFunctions";

// Functions
import {
  sortAnimalsAlphabetically,
  searchListForAnimal,
  formatDate,
} from "../../functions/Functions";

// Styles & utils
import logo from "../../utils/images/shelty-logo.png";
import "./animalupdate.css";

export default class AnimalUpdate extends React.Component {
  constructor() {
    super();
    this.state = {
      animalId: "",
      animalName: "",
      animalAvatar: "animal-avatar-default.jpg",
      animalDateOfBirth: "",
      animalAge: "",
      animalSize: "",
      animalBreed: "",
      animalSpecies: "",
      animalGender: "",
      animalColor: "",
      animalCoatLength: "",
      animalDateArrivedInShelter: "",
      animalDateAdopted: "",
      animalIdentichip: "",
      animalHouseTrained: "",
      animalIsReady: "",
      animalComments: "",
      animalMedicalDescription: "",
      animalMedicalHistory: "",
      animalGalleryImage: "",
      animalGallery: [],

      // medical data
      animalGraftingDate: "",
      animalDewormingDate: "",
      animalSterilizationDate: "",

      animalList: [],
      animalSearchList: [],
      breedList: [],
      genderList: [],
      houseTrainedOptionList: [],
      sizeList: [],
      coatLengthList: [],
      isReadyOptions: [true, false],
      activeListItem: "",
      searchBarInput: "",

      shouldShowStatusMessage: false,
      statusMessage: "",
      statusMessageType: "",

      userAvatar: "user-avatar-default.jpg",
      isUserMenuActive: false,
      isListExpanded: false,
    };

    this.handleListItemClick = this.handleListItemClick.bind(this);
    this.submitSearchBarInput = this.submitSearchBarInput.bind(this);
    this.hideStatusMessage = this.hideStatusMessage.bind(this);
    this.getAnimalUpdatePageData = this.getAnimalUpdatePageData.bind(this);
    this.cleanForm = this.cleanForm.bind(this);
    this.deleteAnimal = this.deleteAnimal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateAnimal = this.updateAnimal.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.deleteGalleryImage = this.deleteGalleryImage.bind(this);
    this.updateAnimalAvatar = this.updateAnimalAvatar.bind(this);
    this.expandList = this.expandList.bind(this);
    this.setGalleryImageAsAvatar = this.setGalleryImageAsAvatar.bind(this);
    this.setAnimalStatus = this.setAnimalStatus.bind(this);
  }

  componentDidMount() {
    this.getAnimalUpdatePageData();
  }

  getAnimalUpdatePageData() {
    // Action: fetch user avatar from server
    // Usage: menu
    var cookieUserId = getUserIdFromCookie();
    getUserAvatar(cookieUserId).then((res) => {
      this.setState({ userAvatar: res.data });
    });
    // Action: fetch all animals from server
    // Usage: left animal list
    getAnimals().then((res) => {
      this.setState({
        animalList: sortAnimalsAlphabetically(res.data),
        animalSearchList: sortAnimalsAlphabetically(res.data),
      });
    });
    getSizeOptions().then((response) => {
      this.setState({ sizeList: response.data });
    });
    getBreedOptions().then((response) => {
      this.setState({ breedList: response.data });
    });
    getGenderOptions().then((response) => {
      this.setState({ genderList: response.data });
    });
    getCoatLengthOptions().then((response) => {
      this.setState({ coatLengthList: response.data });
    });
    getHouseTrainedOptions().then((response) => {
      this.setState({ houseTrainedOptionList: response.data });
    });

    if (this.state.animalId !== "") {
      getAnimalGalleryImages(this.state.animalId).then((res) => {
        this.setState({ animalGallery: res.data });
      });
    }
  }

  cleanForm() {
    this.setState({
      clickedAnimalId: "",
      animalId: "",
      animalName: "",
      animalAvatar: "animal-avatar-default.jpg",
      animalDateOfBirth: "",
      animalAge: "",
      animalSize: "",
      animalBreed: "",
      animalSpecies: "",
      animalGender: "",
      animalColor: "",
      animalCoatLength: "",
      animalDateArrivedInShelter: "",
      animalDateAdopted: "",
      animalIdentichip: "",
      animalHouseTrained: "",
      animalComments: "",
      animalGallery: [],
      animalGraftingDate: "",
      animalDewormingDate: "",
      animalSterilizationDate: "",
      animalMedicalDescription: "",
      animalIsReady: "",
      activeListItem: "",
    });
  }

  handleListItemClick(id) {
    this.setState({ activeListItem: id });
    this.getAnimalDetails(id);
  }

  // save current input and update list with results
  submitSearchBarInput(input) {
    this.setState({ searchBarInput: input });
    if (input !== this.state.searchBarInput) {
      this.setState({ searchBarInput: input }, () => {
        var animalsFound = searchListForAnimal(
          input,
          this.state.animalSearchList
        );
        this.setState({ animalList: animalsFound });
      });
    }
  }

  async updateAnimalAvatar(event) {
    if (this.state.animalId !== "") {
      var file = event.target;
      const formData = new FormData();
      formData.append("image", file.files[0]);
      await updateAnimalAvatar(this.state.animalId, formData)
        .then(() => {
          this.getAnimalDetails(this.state.animalId);
          // Show success message for 2 seconds
          // + refresh data
          this.setState({
            shouldShowStatusMessage: true,
            statusMessageType: "success",
            statusMessage: "Animal avatar has been updated",
          });
          this.getAnimalDetails();
          this.getAnimalUpdatePageData();
        })
        .catch(() => {
          // Show error message for 2 seconds
          this.setState({
            shouldShowStatusMessage: true,
            statusMessageType: "error",
            statusMessage: "An error occurred while updating avatar",
          });
        });
    } else {
      this.setState({
        shouldShowStatusMessage: true,
        statusMessageType: "warning",
        statusMessage: "Cannot update a non-existent animal",
      });
    }
  }

  deleteAnimal() {
    if (this.state.animalId !== "") {
      deleteGalleryImages(this.state.animalId);
      deleteAnimal(this.state.animalId)
        .then(() => {
          // Show success message for 2 seconds
          // + update avatar input field
          this.setState({
            shouldShowStatusMessage: true,
            statusMessageType: "success",
            statusMessage: "Animal has been deleted",
          });
          this.cleanForm();
          this.getAnimalUpdatePageData();
        })
        .catch(() => {
          // Show error message for 2 seconds
          this.setState({
            shouldShowStatusMessage: true,
            statusMessageType: "error",
            statusMessage: "An error occurred while removing",
          });
        });
    } else {
      this.setState({
        shouldShowStatusMessage: true,
        statusMessageType: "warning",
        statusMessage: "Cannot delete a non-existent animal",
      });
    }
  }

  getAnimalDetails(id) {
    if (id !== undefined) {
      getAnimal(id).then((response) => {
        this.setState({
          animalId: response.data.id,
          animalName: response.data.name,
          animalAvatar: response.data.avatar,
          animalDateOfBirth: formatDate(response.data.dateOfBirth),
          animalAge: response.data.age,
          animalSize: response.data.size.id,
          animalBreed: response.data.breed.id,
          animalSpecies: response.data.breed.species.speciesName,
          animalGender: response.data.gender.id,
          animalColor: response.data.color || "",
          animalCoatLength: response.data.coatLength.id,
          animalDateArrivedInShelter: formatDate(
            response.data.dateArrivedInShelter
          ),
          animalDateAdopted: formatDate(response.data.dateAdopted),
          animalIdentichip: response.data.identichip || "",
          animalHouseTrained: response.data.houseTrained.id,
          animalIsReady: response.data.ready,
          animalComments: response.data.comments || "",
        });
      });
      getAnimalGalleryImages(id).then((res) => {
        this.setState({ animalGallery: res.data });
      });
      getMedicalData(id).then((res) => {
        if (res.data) {
          this.setState({
            animalGraftingDate: formatDate(res.data.graftingDate),
            animalDewormingDate: formatDate(res.data.dewormingDate),
            animalSterilizationDate: formatDate(res.data.sterilizationDate),
            animalMedicalDescription: res.data.description || "",
          });
        } else {
          this.setState({
            animalGraftingDate: "",
            animalDewormingDate: "",
            animalSterilizationDate: "",
            animalMedicalDescription: "",
          });
        }
      });
      getMedicalHistory(id).then((res) => {
        if (res.data) {
          this.setState({ animalMedicalHistory: res.data })
        } else {
          this.setState({ animalMedicalHistory: "" })
        }
      })
    }
  }

  hideStatusMessage() {
    this.setState({ shouldShowStatusMessage: false });
  }

  handleSelectChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleInputChange(event) {
    if (event.target.name === "animalAvatar") {
      this.updateAnimalAvatar(event);
    } else if (event.target.name === "animalGalleryImage") {
      this.addAnimalGalleryImage(event);
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  async addAnimalGalleryImage(event) {
    var file = event.target;
    const formData = new FormData();
    formData.append("image", file.files[0]);
    await addAnimalGalleryImage(this.state.animalId, formData)
      .then(() => {
        this.getAnimalDetails(this.state.animalId);
        // Show success message for 2 seconds
        // + refresh data
        this.setState({
          shouldShowStatusMessage: true,
          statusMessageType: "success",
          statusMessage: "Animal image has been added",
        });
        this.getAnimalDetails();
        this.getAnimalUpdatePageData();
      })
      .catch(() => {
        // Show error message for 2 seconds
        this.setState({
          shouldShowStatusMessage: true,
          statusMessageType: "error",
          statusMessage: "An error occurred while adding image",
        });
      });
  }

  updateAnimal() {
    if (this.state.animalId !== "") {
      saveMedicalData(
        this.state.animalId,
        this.state.animalGraftingDate,
        this.state.animalDewormingDate,
        this.state.animalSterilizationDate,
        this.state.animalMedicalDescription
      )
        .then(() => {
          // Show success message for 2 seconds
          // + update avatar input field
          this.setState({
            shouldShowStatusMessage: true,
            statusMessageType: "success",
            statusMessage: "Animal medical data has been updated",
          });
        })
        .catch(() => {
          // Show error message for 2 seconds
          this.setState({
            shouldShowStatusMessage: true,
            statusMessageType: "error",
            statusMessage: "An error occurred while updating medical data",
          });
        });

      updateAnimal(
        this.state.animalId,
        this.state.animalName,
        this.state.animalDateOfBirth,
        this.state.animalAge,
        this.state.animalSize,
        this.state.animalBreed,
        this.state.animalGender,
        this.state.animalColor,
        this.state.animalCoatLength,
        this.state.animalDateArrivedInShelter,
        this.state.animalDateAdopted,
        this.state.animalIdentichip,
        this.state.animalHouseTrained,
        this.state.animalIsReady,
        this.state.animalComments
      )
        .then(() => {
          // Show success message for 2 seconds
          // + update avatar input field
          this.setState({
            shouldShowStatusMessage: true,
            statusMessageType: "success",
            statusMessage: "Animal has been updated",
          });
          this.getAnimalUpdatePageData();
        })
        .catch(() => {
          // Show error message for 2 seconds
          this.setState({
            shouldShowStatusMessage: true,
            statusMessageType: "error",
            statusMessage: "An error occurred while updating animal",
          });
        });
    } else {
      // perform animal create
      addNewAnimal(
        this.state.animalName,
        this.state.animalDateOfBirth,
        this.state.animalAge,
        this.state.animalSize,
        this.state.animalBreed,
        this.state.animalGender,
        this.state.animalColor,
        this.state.animalDateArrivedInShelter,
        this.state.animalDateAdopted,
        this.state.animalIdentichip,
        this.state.animalHouseTrained,
        this.state.animalComments,
        this.state.animalCoatLength,
        this.state.animalIsReady
      )
        .then(() => {
          // Show success message for 2 seconds
          this.setState({
            shouldShowStatusMessage: true,
            statusMessageType: "success",
            statusMessage: "Animal has been added",
          });
          getAnimalId(this.state.animalName).then((res) => {
            const id = res.data;
            this.setState({ animalId: res.data });
            saveMedicalData(
              id,
              this.state.animalGraftingDate,
              this.state.animalDewormingDate,
              this.state.animalSterilizationDate,
              this.state.animalMedicalDescription
            )
              .then(() => {
                // Show success message for 2 seconds
                // + update avatar input field
                this.setState({
                  shouldShowStatusMessage: true,
                  statusMessageType: "success",
                  statusMessage: "Animal medical data has been updated",
                });
                this.getAnimalUpdatePageData();
              })
              .catch(() => {
                // Show error message for 2 seconds
                this.setState({
                  shouldShowStatusMessage: true,
                  statusMessageType: "error",
                  statusMessage:
                    "An error occurred while updating medical data",
                });
              });
          });
        })
        .catch(() => {
          // Show error message for 2 seconds
          this.setState({
            shouldShowStatusMessage: true,
            statusMessageType: "error",
            statusMessage: "An error occurred while adding animal",
          });
        });
    }
  }

  deleteGalleryImage(imageId) {
    deleteGalleryImage(imageId)
      .then(() => {
        // Show success message for 2 seconds
        // + update avatar input field
        this.setState({
          shouldShowStatusMessage: true,
          statusMessageType: "success",
          statusMessage: "Gallery image has been deleted",
        });
        this.getAnimalUpdatePageData();
      })
      .catch(() => {
        // Show error message for 2 seconds
        this.setState({
          shouldShowStatusMessage: true,
          statusMessageType: "error",
          statusMessage: "An error occurred while deleting image",
        });
      });
  }

  expandList() {
    if (this.state.isListExpanded) {
      this.setState({ isListExpanded: false })
      document.getElementById('searchBar').setAttribute("style", "display: flex");
      document.getElementById('animalList').setAttribute("style", "width: 325px; border-right: 1px solid var(--primary-grey-light);");
      document.getElementById('animalUpdate-container').setAttribute("style", "display: block");
      var listItems = document.getElementsByClassName('animalList-item');
      for (var i = 0; i < listItems.length; i++) {
        listItems[i].setAttribute("style", "width:calc(100% - 10px); margin: 0;");
      }
      document.getElementById('animalList-add').setAttribute("style", "width: inherit");
      document.getElementsByClassName('test')[0].setAttribute("style", "border-right: 1px solid var(--primary-grey-light)");
      document.getElementsByClassName('animalList-add-inner')[0].setAttribute("style", "display: flex");
    } else {
      this.setState({ isListExpanded: true })
      document.getElementById('searchBar').setAttribute("style", "display: none");
      document.getElementById('animalList').setAttribute("style", "width: calc(100% - 0px); border: none;");
      document.getElementById('animalUpdate-container').setAttribute("style", "display: none");
      var listItems2 = document.getElementsByClassName('animalList-item');
      for (var j = 0; j < listItems2.length; j++) {
        listItems2[j].setAttribute("style", "width: calc(25% - 10px); float: left; margin: 0; margin-right: 10px;");
      }
      document.getElementById('animalList-add').setAttribute("style", "width: calc(100% - 40px)");
      document.getElementsByClassName('test')[0].setAttribute("style", "border: none");
      document.getElementsByClassName('animalList-add-inner')[0].setAttribute("style", "display: none");
    }
  }

  setGalleryImageAsAvatar(props) {
    var animalId = this.state.animalId;
    var imageId = props;

    setAnimalAvatarFromGalleryImage(imageId, animalId).then(() => {
      this.getAnimalDetails(this.state.animalId);
      // Show success message for 2 seconds
      // + refresh data
      this.setState({
        shouldShowStatusMessage: true,
        statusMessageType: "success",
        statusMessage: "Animal avatar has been updated",
      });
      this.getAnimalUpdatePageData();
    });
  }

  setAnimalStatus() {
    if (this.state.animalIsReady) {
      return "Status: ✔️"
    } else if (this.state.animalDateAdopted !== "") {
      return "Status: 👪"
    } else if (!this.state.animalIsReady) {
      return "Status: ❌"
    } else {
      return "Status: unknown"
    }
  }

  render() {
    var description = this.setAnimalStatus();
    return (
      <div className="animalUpdate">
        <SearchHeader
          logo={logo}
          submitSearchInput={this.submitSearchBarInput}
          userAvatar={this.state.userAvatar}
          showMainMenu={this.toggleMainMenu}
        />
        <AnimalList
          list={this.state.animalList}
          handleClick={this.handleListItemClick}
          clickedItem={this.state.activeListItem}
          checkIfActive={this.checkIfListItemIsActive}
          showAnimalAddForm={this.cleanForm}
          expandList={this.expandList}
          isListExpanded={this.state.isListExpanded}
        />
        <div className="animalUpdate-container" id="animalUpdate-container">
          <div className="animalUpdate-container-profile">
            <DefaultAnimalCard
              name={this.state.animalName}
              description={description}
              avatar={this.state.animalAvatar}
              deleteAnimal={this.deleteAnimal}
              updateAnimal={this.updateAnimal}
              handleAvatarChange={this.handleInputChange}
            />
          </div>
          <div className="animalUpdate-container-general-info">
            <AnimalGeneralInfo
              name={this.state.animalName}
              identichip={this.state.animalIdentichip}
              age={this.state.animalAge}
              size={this.state.animalSize}
              color={this.state.animalColor}
              breed={this.state.animalBreed}
              gender={this.state.animalGender}
              coatLength={this.state.animalCoatLength}
              houseTrained={this.state.animalHouseTrained}
              isReady={this.state.animalIsReady}
              dateArrivedInShelter={this.state.animalDateArrivedInShelter}
              dateAdopted={this.state.animalDateAdopted}
              dateOfBirth={this.state.animalDateOfBirth}
              handleInputChange={this.handleInputChange}
              handleSelectChange={this.handleSelectChange}
              sizeList={this.state.sizeList}
              breedList={this.state.breedList}
              genderList={this.state.genderList}
              coatLengthList={this.state.coatLengthList}
              houseTrainedOptionList={this.state.houseTrainedOptionList}
              isReadyOptions={this.state.isReadyOptions}
            />
          </div>
          <div className="animalUpdate-container-general-desc">
            <AnimalGeneralDescription
              label=""
              comments={this.state.animalComments}
              handleInputChange={this.handleSelectChange}
            />
          </div>
          <div className="animalUpdate-container-images">
            <AnimalImages
              handleChange={this.handleInputChange}
              animalGallery={this.state.animalGallery}
              deleteGalleryImage={this.deleteGalleryImage}
              setGalleryImageAsAvatar={this.setGalleryImageAsAvatar}
            />
          </div>
          <div className="animalUpdate-container-medical-info">
            <AnimalMedicalInfo
              animalId={this.state.animalId}
              graftingDate={this.state.animalGraftingDate}
              dewormingDate={this.state.animalDewormingDate}
              sterilizationDate={this.state.animalSterilizationDate}
              handleInputChange={this.handleInputChange}
              medicalHistory={this.state.animalMedicalHistory}
              refreshPage={() => this.getAnimalDetails(this.state.animalId)}
            />
          </div>
          <AnimalMedicalDescription
            description={this.state.animalMedicalDescription}
            handleInputChange={this.handleInputChange}
          />
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
