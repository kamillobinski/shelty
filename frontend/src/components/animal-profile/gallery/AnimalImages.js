import React from "react";
import CategoryTitle from "../../block/CategoryTitle";
import ImageInput from "../../input/image/gallery/ImageInput";
import "./animalimages.css";

const serverurl = "http://localhost:8081/images/animal/gallery/";

const AnimalImages = (props) => {
  return (
    <div className="animalImages">
      <div className="animalImages-category">
        <CategoryTitle title="Images" />
      </div>
      <div className="animalImages-gallery">
        <ImageInput name={props.name} handleChange={props.handleChange} />
        {props.animalGallery.map((image, i) => (
          <div className="animalImages-item-border" key={i}>
            <div
              className="animalImages-item"
              style={{
                backgroundImage: "url(" + serverurl + image.url + ")",
                backgroundSize: "cover",
              }}
            >
              <div
                className="animalImages-item-delete-button"
                onClick={() => props.deleteGalleryImage(image.id)}
              >
                <span>-</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimalImages;
