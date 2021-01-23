import React from "react";
import PublicHeader from "../../components/header/header-public/PublicHeader";
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
          <PublicHeader />
        </div>
      </div>
    );
  }
}
