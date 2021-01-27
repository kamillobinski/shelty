import React from 'react';
import { ANIMAL_GALLERY_ROUTE } from '../../api/Api';
import { ExitIcon, LeftArrow, RightArrow } from '../../utils/icons/Icons';
import './imagegallery.css'

class ImageGallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = { gallery: [], selected: "", show: false }
        this.toggleImageGallery = this.toggleImageGallery.bind(this);
        this.showNextImage = this.showNextImage.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidMount() {
        this.setState({ gallery: this.props.gallery, selected: this.props.selected });
    }

    componentWillUnmount() {
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.gallery !== this.state.gallery) {
            this.setState({ gallery: nextProps.gallery });
        }
        if (nextProps.selected !== this.state.selected) {
            this.setState({ selected: nextProps.selected });
        }
        if (nextProps.show !== this.state.show) {
            this.setState({ show: nextProps.show });
        }

        if (nextProps.show) {
            document.body.addEventListener('keydown', this.handleKeyPress, true);
        } else {
            document.body.removeEventListener('keydown', this.handleKeyPress, true);
        }
    }

    checkIfImageIsSelected(image, selectedState) {
        if (image === selectedState) {
            return "active";
        }
    }

    toggleImageGallery(boolean) {
        if (boolean) {
            return { display: "block" }
        } else {
            return { display: "none" };
        }
    }
    //.find(x => x.id === '45').foo;
    showNextImage(direction, gallery, current) {
        var image = null;
        switch (direction) {
            case "right": {
                for (var i = 0; i < gallery.length; i++) {
                    if (gallery[i].url === current && gallery[i + 1] !== undefined) {
                        console.log(i)
                        image = gallery[i + 1];
                        this.props.updateGalleryFromChild("select", image.url);
                    }
                }
                break;
            }
            case "left": {
                for (var j = 0; j < gallery.length; j++) {
                    if (gallery[j].url === current && gallery[j - 1] !== undefined) {
                        console.log(j)
                        image = gallery[j - 1];
                        this.props.updateGalleryFromChild("select", image.url);
                    }
                }
                break;
            }
            default: { break; }
        }
    }

    handleKeyPress = (event) => {
        if (event.key === 'Escape') {
            this.props.updateGalleryFromChild("close");
        }
    }

    render() {
        if (this.state.gallery.length > 0 && this.state.selected !== "") {
            return (
                <div className="imageGallery" style={this.toggleImageGallery(this.state.show)}>
                    <div className="imageGallery-background" style={{ backgroundImage: "url(" + ANIMAL_GALLERY_ROUTE + this.state.selected + ")" }}>
                        <div className="imageGallery-background-overlay"></div>
                    </div>
                    <div className="imageGallery-layout">
                        <button className="imageGallery-exit-button" onClick={() => this.props.updateGalleryFromChild("close")}>
                            <ExitIcon fill="white" height="14px" onKeyDown={(event) => this.handleKeyPress(event)} tabIndex="0" id="exit-button" />
                        </button>
                        <button className="imageGallery-left-button" onClick={() => this.showNextImage("left", this.state.gallery, this.state.selected)}>
                            <LeftArrow fill="white" height="14px" />
                        </button>
                        <button className="imageGallery-right-button" onClick={() => this.showNextImage("right", this.state.gallery, this.state.selected)}>
                            <RightArrow fill="white" height="14px" />
                        </button>
                        <div className="imageGallery-top-limiter">
                            <div className="imageGallery-top-limiter-image">
                                <img src={ANIMAL_GALLERY_ROUTE + this.state.selected} alt={this.state.selected} />
                            </div>
                        </div>
                        <div className="imageGallery-bottom-limiter">
                            <div className="imageGallery-bottom-limiter-inner">
                                {this.state.gallery.map((image) => (
                                    <div className={"imageGallery-bottom-limiter-inner-item " + this.checkIfImageIsSelected(image.url, this.state.selected)} onClick={() => this.props.updateGalleryFromChild("select", image.url)} key={image.id}>
                                        <div className="imageGallery-bottom-limiter-inner-item-avatar">
                                            <div className="imageGallery-bottom-limiter-inner-item-avatar-image" style={{ backgroundImage: "url(" + ANIMAL_GALLERY_ROUTE + image.url + ")" }}>
                                                <div className="imageGallery-bottom-limiter-inner-item-avatar-image-overlay"></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div >
            )
        } else {
            return <div></div>
        }
    }
}

export default ImageGallery;