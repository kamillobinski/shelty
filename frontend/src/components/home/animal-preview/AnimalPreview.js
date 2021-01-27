import React from "react";
import PublicHeader from "../../header/header-public/PublicHeader";
import TitleHeader from '../../header/header-title/TitleHeader';
import ImageGallery from '../../image-gallery/ImageGallery';
import TextareaAutosize from 'react-textarea-autosize';
import { formatDateToDisplay } from '../../../functions/Functions';
import { ANIMAL_AVATAR_ROUTE, ANIMAL_GALLERY_ROUTE } from '../../../api/Api';
import { getAnimalDetails, getGalleryImages } from "../../../api/PublicApiFunctions";
import "./animalpreview.css";

const EMPTY_ITEM = "unknown";

export default class AnimalPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animalId: props.match.params.id,
      animalGallery: [],
      animal: "",
      isReady: false,
      selectedImage: "",
      shouldShowImageGallery: false,
    };
    this.showImageGallery = this.showImageGallery.bind(this);
    this.updateGalleryFromChild = this.updateGalleryFromChild.bind(this);
  }

  componentDidMount() {
    getAnimalDetails(this.state.animalId).then((res) => {
      this.setState({ animal: res.data, isReady: true });
    });
    getGalleryImages(this.state.animalId).then((res) => {
      this.setState({ animalGallery: res.data })
    });
  }

  showImageGallery(selectedImage, shouldShow) {
    this.setState({ selectedImage: selectedImage, shouldShowImageGallery: shouldShow });
  }

  updateGalleryFromChild(type, value) {
    switch (type) {
      case "close": { this.setState({ shouldShowImageGallery: false }); break; }
      case "select": { this.setState({ selectedImage: value }); break; }
      default: { break; }
    }
  }

  render() {
    return (
      <div className="animalPreview">
        <div className="animalPreview-inner">
          <PublicHeader />
          {this.state.isReady ? (
            <>
              <div className="animalPreview-inner-top">
                {/* AVATAR */}
                <div className="animalPreview-inner-top-avatar">
                  <div className="animalPreview-inner-top-avatar-image" style={{ backgroundImage: "url(" + ANIMAL_AVATAR_ROUTE + this.state.animal.avatar + ")" }}>
                  </div>
                </div>
                {/* TITLE */}
                <div className="animalPreview-inner-top-title">
                  <TitleHeader title={this.state.animal.name} description={this.state.animal.breed.breedName + " - " + this.state.animal.breed.species.speciesName} />
                </div>
                <div className="animalPreview-inner-top-gallery">
                  <div className="animalPreview-inner-top-gallery-inner">
                    {/* ITEM */}
                    {this.state.animalGallery.map((image) => (
                      <div className="animalPreview-inner-top-gallery-inner-item" onClick={() => this.showImageGallery(image.url, true)}>
                        <div className="animalPreview-inner-top-gallery-inner-item-avatar">
                          <div className="animalPreview-inner-top-gallery-inner-item-avatar-image" style={{ backgroundImage: "url(" + ANIMAL_GALLERY_ROUTE + image.url + ")" }}>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="animalPreview-inner-separator"></div>
              {/* Categorized info */}
              <div className="animalPreview-inner-info">
                <div className="animalPreview-inner-info-category">
                  AGE: <span>{this.state.animal.age || EMPTY_ITEM}</span>
                </div>
                <div className="animalPreview-inner-info-category">
                  SIZE: <span>{this.state.animal.size.type || EMPTY_ITEM}</span>
                </div>
                <div className="animalPreview-inner-info-category">
                  BREED: <span>{this.state.animal.breed.breedName || EMPTY_ITEM}</span>
                </div>
                <div className="animalPreview-inner-info-category">
                  GENDER: <span>{this.state.animal.gender.type || EMPTY_ITEM}</span>
                </div>
                <div className="animalPreview-inner-info-category">
                  COAT LENGTH: <span>{this.state.animal.coatLength.type || EMPTY_ITEM}</span>
                </div>
                <div className="animalPreview-inner-info-category">
                  HOUSE-TRAINED: <span>{this.state.animal.houseTrained.type || EMPTY_ITEM}</span>
                </div>
                <div className="animalPreview-inner-info-category">
                  COLOR: <span>{this.state.animal.color || EMPTY_ITEM}</span>
                </div>
                <div className="animalPreview-inner-info-category">
                  DATE ARRIVED: <span>{formatDateToDisplay(this.state.animal.dateArrivedInShelter) || EMPTY_ITEM}</span>
                </div>
              </div>
              <div className="animalPreview-inner-separator"></div>
              {/* TEXT */}
              <TextareaAutosize value={this.state.animal.comments} autoCorrect="false" readOnly={true} />
            </>
          ) : null}
        </div>
        <ImageGallery gallery={this.state.animalGallery} selected={this.state.selectedImage} show={this.state.shouldShowImageGallery} updateGalleryFromChild={this.updateGalleryFromChild} />
      </div>
    );
  }
}
