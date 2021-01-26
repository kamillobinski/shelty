import React from "react";
import {
  signInUser,
  setUserCookie,
  setTokenCookie,
} from "../../api/UserApiFunctions";
import { getTomorrowDate, redirectUser } from "../../functions/Functions";
import { InfoIcon } from "../../utils/icons/Icons";
import StatusMessageHandler from '../../components/status-message/StatusMessageHandler';
import "./signin.css";

const GREY_SHADOW = "0px 0px 48px -21px rgba(0, 0, 0, 0.3)";
const RED_SHADOW = "0px 0px 80px -31px rgba(232, 51, 66, 0.7)";
const ACTIVE_SHAKE = "activeShake";
const DISABLED_SHAKE = "disabledShake";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      style: GREY_SHADOW,
      shakeAnimation: DISABLED_SHAKE,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSignInError = this.handleSignInError.bind(this);
  }

  handleInputChange(event) {
    switch (event.target.name) {
      case "username": {
        this.setState({ username: event.target.value });
        break;
      }
      case "password": {
        this.setState({ password: event.target.value });
        break;
      }
      default: {
        break;
      }
    }
  }

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.signInUser();
    }
  };

  async signInUser() {
    await signInUser(this.state.username, this.state.password)
      .then((response) => {
        if (response.data !== null) {
          var tomorrow = getTomorrowDate();
          setUserCookie(response.data, tomorrow);
          setTokenCookie(response.data.accessToken, tomorrow);
          redirectUser("/admin/animal/update");
        }
      })
      .catch((error) => this.handleSignInError(error.response.status));
  }

  // Show shake animation
  handleSignInError(status) {
    if (status === 401) {
      this.setState({
        style: RED_SHADOW,
        shakeAnimation: ACTIVE_SHAKE,
      });
      setTimeout(
        function () {
          this.setState({
            style: GREY_SHADOW,
            shakeAnimation: DISABLED_SHAKE,
          });
        }.bind(this),
        200
      );
    }
  }

  render() {
    return (
      <div className="signin" onKeyPress={this.handleKeyPress}>
        <div
          className="signin-inner"
          id={this.state.shakeAnimation}
          style={{
            boxShadow: this.state.style,
          }}
        >
          <div className="signin-inner-header noselect">
            <div className="signin-inner-header-logo">
              <span className="name">Shelty</span>
              <span className="category">| Sign In</span>
            </div>
          </div>
          <div className="signin-inner-form">
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
              placeholder="Username"
            />
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              placeholder="Password"
            />
            <button type="submit" onClick={() => this.signInUser()}>
              Submit
            </button>
          </div>
        </div>
        {/* info */}
        <div className="signin-info">
          <div className="signin-info-icon">
            <InfoIcon height="20px" />
          </div>
          <div className="signin-info-text">
            <span>Admin panel is not mobile friendly</span>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
