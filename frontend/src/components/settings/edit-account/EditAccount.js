import React from "react";
import TextInput from "../../input/text/TextInput";
import {
  getFirstNameFromCookie,
  getLastNameFromCookie,
  getUsernameFromCookie,
  getEmailFromCookie,
  updateUser,
  getUserIdFromCookie,
  getUserAvatar,
  updateUserAvatar,
  signOutUser,
  updatePassword,
} from "../../../api/UserApiFunctions";
import PrimaryButton from "../../button/PrimaryButton";
import "./editaccount.css";
import ImageInput from "../../input/image/gallery/ImageInput";
import UserAvatar from "../../avatar/user/UserAvatar";
import AvatarInput from "../../input/image/avatar/AvatarInput";
import StatusMessageHandler from "../../status-message/StatusMessageHandler";

class EditAccount extends React.Component {
  constructor() {
    super();
    this.state = {
      id: "",
      avatar: "user-avatar-default.jpg",
      username: "",
      firstName: "",
      lastName: "",
      email: "",

      passwordOld: "",
      passwordNew: "",
      passwordNewRepeat: "",

      shouldShowStatusMessage: false,
      statusMessage: "",
      statusMessageType: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateUserAccount = this.updateUserAccount.bind(this);
    this.updateState = this.updateState.bind(this);
    this.updateUserAvatar = this.updateUserAvatar.bind(this);
  }

  componentDidMount() {
    this.getUserAccountDetails();
  }

  handleInputChange(event) {
    if (event.target.name === "avatar") {
      this.updateUserAvatar(event);
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  getUserAccountDetails() {
    var cookieFirstName = getFirstNameFromCookie();
    var cookieLastName = getLastNameFromCookie();
    var cookieUsername = getUsernameFromCookie();
    var cookieEmail = getEmailFromCookie();
    var cookieUserId = getUserIdFromCookie();
    this.setState({ id: cookieUserId });
    getUserAvatar(cookieUserId).then((response) => {
      this.setState({ avatar: response.data });
    });
    this.setState({
      firstName: cookieFirstName,
      lastName: cookieLastName,
      email: cookieEmail,
      username: cookieUsername,
    });
  }

  async updateUserAvatar(event) {
    var file = event.target;
    const formData = new FormData();
    formData.append("image", file.files[0]);
    await updateUserAvatar(this.state.id, formData)
      .then(() => {
        this.getUserAccountDetails();
      })
      .catch(() => {});
  }

  updateUserAccount() {
    updateUser(
      this.state.id,
      this.state.username,
      this.state.firstName,
      this.state.lastName,
      this.state.email,
      ""
    )
      .then(() => {
        this.setState({
          shouldShowStatusMessage: true,
          statusMessageType: "success",
          statusMessage: "Account has been updated",
        });
      })
      .catch(() => {
        this.setState({
          shouldShowStatusMessage: true,
          statusMessageType: "error",
          statusMessage: "An error occurred while updating account",
        });
      });
  }

  updateState() {
    if (
      this.state.shouldShowStatusMessage &&
      this.state.statusMessageType === "success"
    ) {
      this.setState({ shouldShowStatusMessage: false });
      signOutUser();
    } else {
      this.setState({ shouldShowStatusMessage: false });
    }
  }

  savePassword() {
    if (this.state.passwordNew === this.state.passwordNewRepeat) {
      updatePassword(
        this.state.id,
        this.state.passwordOld,
        this.state.passwordNew
      )
        .then((res) => {
          if (res.data) {
            this.setState({
              shouldShowStatusMessage: true,
              statusMessageType: "success",
              statusMessage: "Password has been updated",
            });
          } else {
            this.setState({
              shouldShowStatusMessage: true,
              statusMessageType: "error",
              statusMessage: "An error occurred while updating password",
            });
          }
        })
        .catch(() => {
          this.setState({
            shouldShowStatusMessage: true,
            statusMessageType: "error",
            statusMessage: "An error occurred while updating password",
          });
        });
    } else {
      this.setState({
        shouldShowStatusMessage: true,
        statusMessageType: "error",
        statusMessage: "Passwords don't match",
      });
    }
  }

  render() {
    return (
      <div className="editAccount">
        <div className="editAccount-inner">
          <div className="editAccount-inner-avatar">
            <div className="editAccount-inner-avatar-image">
              <UserAvatar
                image={this.state.avatar}
                width="100px"
                height="100px"
              />
            </div>
            <div className="editAccount-inner-avatar-image-buttons">
              <AvatarInput
                text="Change avatar"
                type="dark"
                width="140px"
                name="avatar"
                handleChange={this.handleInputChange}
              />
              <PrimaryButton
                text="Logout"
                type="light"
                width="140px"
                onClick={() => signOutUser()}
              />
            </div>
          </div>
          <TextInput
            label="Username:"
            value={this.state.username}
            onChange={this.handleInputChange}
            name="username"
            width="100%"
          />
          <TextInput
            label="First name:"
            value={this.state.firstName}
            onChange={this.handleInputChange}
            name="firstName"
            width="100%"
          />
          <TextInput
            label="Last name:"
            value={this.state.lastName}
            onChange={this.handleInputChange}
            name="lastName"
            width="100%"
          />
          <TextInput
            label="E-mail:"
            value={this.state.email}
            onChange={this.handleInputChange}
            name="email"
            width="100%"
          />
          <PrimaryButton
            text="Save"
            type="light"
            width="100px"
            onClick={this.updateUserAccount}
          />
          <TextInput
            label="Old password:"
            width="100%"
            name="passwordOld"
            value={this.state.passwordOld}
            onChange={this.handleInputChange}
            type="password"
          />
          <TextInput
            label="New password:"
            width="100%"
            name="passwordNew"
            value={this.state.passwordNew}
            onChange={this.handleInputChange}
            type="password"
          />
          <TextInput
            label="Repeat new password:"
            width="100%"
            name="passwordNewRepeat"
            value={this.state.passwordNewRepeat}
            onChange={this.handleInputChange}
            type="password"
          />
          <PrimaryButton
            text="Change"
            type="light"
            width="100px"
            onClick={() => this.savePassword()}
          />
        </div>
        <StatusMessageHandler
          shouldShowStatusMessage={this.state.shouldShowStatusMessage}
          statusMessageType={this.state.statusMessageType}
          statusMessage={this.state.statusMessage}
          updateStateOnClose={this.updateState}
        />
      </div>
    );
  }
}

export default EditAccount;
