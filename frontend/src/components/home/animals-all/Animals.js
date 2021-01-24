import React from "react";
import PublicHeader from "../../header/header-public/PublicHeader";
import { getLatestAnimals } from "../../../api/PublicApiFunctions";
import AnimalGrid from '../../animal-grid/AnimalGrid';
import TitleHeader from '../../header/header-title/TitleHeader';
import "./animals.css";

class Animals extends React.Component {
  constructor() {
    super();
    this.state = { animals: [] };
    this.getInitialData = this.getInitialData.bind(this);
  }

  componentDidMount() {
    this.getInitialData();
  }

  getInitialData() {
    getLatestAnimals().then((res) => {
      this.setState({ animals: res.data });
    });
  }

  render() {
    return (
      <div className="animals">
        <div className="animals-inner">
          <PublicHeader />
          <TitleHeader title="All animals" description="These pets are waiting for a new loving family" />
          <AnimalGrid animalList={this.state.animals} />
        </div>
      </div >
    );
  }
}

export default Animals;
