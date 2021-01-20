import React from "react";
import animal_walk from "../../../utils/svg/animal_walk.svg";
import "./banner.css";

const title = "Unconditional love is as close as your nearest shelter";
const description = `At vero eos et accusamus et iusto odio 
dignissimos ducimus quiblanditiis praesentium voluptatum deleniti 
atque corrupti quos dolores et quas molestias excepturi sint occaecati 
cupiditate non provident.`;

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-text">
        <div className="banner-text-wrapper">
          <span className="banner-text-title">{title}</span>
          <span className="banner-text-description">{description}</span>
        </div>
      </div>
      <div className="banner-image">
        <div className="banner-image-outline">
          <img src={animal_walk} alt="banner" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
