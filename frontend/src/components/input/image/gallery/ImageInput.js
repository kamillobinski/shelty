import React from "react";
import { AddIcon } from "../../../../utils/icons/Icons";
import "./imageinput.css";

const ImageInput = (props) => {
  const handleClick = () => {
    document.getElementById("hiddenFileInput").click();
  };

  return (
    <div className="imageInput" onClick={handleClick}>
      <div className="animalImages-add">
        <AddIcon height="25px" fill="var(--primary-black)" />
      </div>
      <div className="imageInput-input">
        <input
          type="file"
          id="hiddenFileInput"
          name="animalGalleryImage"
          onChange={props.handleChange}
        />
      </div>
    </div>
  );
};

export default ImageInput;
