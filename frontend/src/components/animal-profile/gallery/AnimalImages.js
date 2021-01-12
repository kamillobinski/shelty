import React from "react";
import CategoryTitle from "../../block/CategoryTitle";
import ImageInput from "../../input/image/gallery/ImageInput";
import { ContextMenuTrigger } from "react-contextmenu";
import { AdminGalleryContextMenu } from '../../context-menu/ContextMenus'
import '../../context-menu/contextmenu.css';
import "./animalimages.css";

const serverurl = "http://localhost:8081/images/animal/gallery/";

class AnimalImages extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedImage: "test" }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(props) {
    switch (props) {
      case "set": { break; }
      case "delete": { break; }
    }
  }

  render() {
    return (
      <div className="animalImages" >
        <div className="animalImages-category">
          <CategoryTitle title="Images" />
        </div>
        <div className="animalImages-gallery">
          <ImageInput name={this.props.name} handleChange={this.props.handleChange} />
          {this.props.animalGallery.map((image, i) => (
            <ContextMenuTrigger id="same_unique_identifier">
              <div className="animalImages-item-border" key={i} onContextMenu={() => this.setState({ selectedImage: image.id })}>
                <div
                  className="animalImages-item"
                  style={{
                    backgroundImage: "url(" + serverurl + image.url + ")",
                    backgroundSize: "cover",
                  }}
                >
                  <div
                    className="animalImages-item-delete-button"
                    onClick={() => this.props.deleteGalleryImage(image.id)}
                  >
                    <span>-</span>
                  </div>
                </div>
              </div>
            </ContextMenuTrigger>
          ))}
        </div>
        <AdminGalleryContextMenu handleClick={this.handleClick} />
      </div >
    );
  };
}

export default AnimalImages;
