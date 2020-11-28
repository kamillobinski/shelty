import React from "react";
import PublicHeader from "../../components/header/header-public/PublicHeader";
import Banner from "../../components/home/banner/Banner";
import "./home.css";

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="home">
        <PublicHeader />
        <Banner />
      </div>
    );
  }
}
