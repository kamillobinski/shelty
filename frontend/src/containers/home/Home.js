import React from "react";
import HomepageContent from '../../components/home/homepage/HomepageContent';
import "./home.css";

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="home">
        <div className="home-inner">
          <HomepageContent />
        </div>
      </div>
    );
  }
}
