import React from "react";
import { Link } from "react-router-dom";
import { MenuIcon } from '../../../utils/icons/Icons';
import "./publicheader.css";

const TITLE = "Shelty";
const MENU = [["/", "Homepage"], ["/animals", "Animals for adoption"], ["/finder", "Find a perfect pet"], ["/blog", "Blog"], ["/contact", "Contact"], ["/signin", "Sign-In"]]

class PublicHeader extends React.Component {
  constructor() {
    super();
    this.state = { shouldDisplayMenu: false }
    this.toggleMenu = this.toggleMenu.bind(this);
    this.renderMenu = this.renderMenu.bind(this);
  }

  renderMenu() {
    if (this.state.shouldDisplayMenu) {
      return { visibility: "visible", opacity: 1 }
    } else {
      return { visibility: "hidden", opacity: 0 }
    }
  }

  toggleMenu() {
    this.setState({ shouldDisplayMenu: !this.state.shouldDisplayMenu })
  }

  render() {
    return (
      <div className="publicHeader">
        <div className="publicHeader-logo">
          <Link to={MENU[0][0]}>
            <span>{TITLE}</span>
          </Link>
        </div>
        <div className="publicHeader-button" onClick={() => this.toggleMenu()}>
          <MenuIcon height="30px" fill="black" />
        </div>
        <div className="publicHeader-menu" style={this.renderMenu()} >
          <Link to={MENU[0][0]}>
            <div className="publicHeader-menu-item">
              <span>{MENU[0][1]}</span>
            </div>
          </Link>
          <Link to={MENU[1][0]}>
            <div className="publicHeader-menu-item">
              <span>{MENU[1][1]}</span>
            </div>
          </Link>
          <Link to={MENU[2][0]}>
            <div className="publicHeader-menu-item">
              <span>{MENU[2][1]}</span>
            </div>
          </Link>
          <Link to={MENU[3][0]}>
            <div className="publicHeader-menu-item">
              <span>{MENU[3][1]}</span>
            </div>
          </Link>
          <Link to={MENU[4][0]}>
            <div className="publicHeader-menu-item">
              <span>{MENU[4][1]}</span>
            </div>
          </Link>
          <div className="publicHeader-menu-separator"></div>
          <Link to={MENU[5][0]}>
            <div className="publicHeader-menu-item">
              <span>{MENU[5][1]}</span>
            </div>
          </Link>
        </div>
      </div>
    );
  };
}

export default PublicHeader;
