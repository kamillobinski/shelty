import React from "react";
import DefaultHeader from "../../components/header/header-default/DefaultHeader";
import SettingsMenu from "../../components/settings/menu/SettingsMenu";
import SettingsContainer from "../../components/settings/container/SettingsContainer";
import { getUserAvatar, getUserIdFromCookie } from "../../api/UserApiFunctions";
import "./settings.css";

export default class Settings extends React.Component {
  constructor() {
    super();
    this.state = { userAvatar: "user-avatar-default.jpg" };
  }

  componentDidMount() {
    // Action: fetch user avatar from server
    // Usage: menu
    var cookieUserId = getUserIdFromCookie();
    getUserAvatar(cookieUserId).then((res) => {
      this.setState({ userAvatar: res.data });
    });
  }

  render() {
    return (
      <div className="settings">
        <DefaultHeader userAvatar={this.state.userAvatar} />
        <SettingsMenu />
        <SettingsContainer />
      </div>
    );
  }
}
