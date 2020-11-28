import React from "react";
import PrimaryButton from "../../button/PrimaryButton";
import { Link } from "react-router-dom";
import "./publicheader.css";

const PublicHeader = () => {
  return (
    <div className="publicHeader">
      <div className="publicHeader-inner">
        <Link to="/">
          <div className="publicHeader-inner-logo">
            <span>Shelty</span>
          </div>
        </Link>
        <div className="publicHeader-inner-right-content">
          <span className="publicHeader-inner-right-content-link">
            <Link to="/animals">All animals</Link>
          </span>
          <span className="publicHeader-inner-right-content-link">
            <Link to="/finder">Pet finder</Link>
          </span>
          <span className="publicHeader-inner-right-content-link">Blog</span>
          <span className="publicHeader-inner-right-content-link">About</span>
          <span className="publicHeader-inner-right-content-link">Contact</span>
          <Link to="/signin">
            <PrimaryButton text="SignIn" width="80px" type="dark" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PublicHeader;
