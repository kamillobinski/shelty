import React from "react";
import PrimaryButton from "../../button/PrimaryButton";
import TextInput from "../../input/text/TextInput";
import { createUser } from '../../../api/UserApiFunctions';
import { checkIfAdmin } from '../../../functions/Functions';
import "./registeruser.css";

const initialState = {
  username: "", firstName: "", lastName: "", email: "", password: "", role: "admin"
};

class RegisterUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.createNewAccount = this.createNewAccount.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  componentDidMount() {
    checkIfAdmin();
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  resetState() {
    this.setState(initialState);
  }

  createNewAccount(state) {
    if (state.username !== "" && state.password !== "" && state.firstName !== "" && state.lastName !== "" && state.email !== "") {
      // perform new user register
      var role = state.role;
      if (role === "") {
        role = "admin"; // if role not declared, select admin as default value
      }
      createUser(state.username, state.firstName, state.lastName, state.email, state.password, role).then(() => {
        this.resetState();
      })
    } else {
      // show error
      alert('Error: Fill all required fields!');
    }
  }

  render() {
    return (
      <div className="registerUser">
        <div className="registerUser-inner">
          <TextInput
            label="Username:"
            value={this.state.username}
            onChange={this.handleInputChange}
            name="username"
            width="100%"
            isRequired={true}
          />
          <TextInput
            label="Role:"
            value={this.state.role}
            onChange={this.handleInputChange}
            name="role"
            width="100%"
            isRequired={true}
            placeholder="admin or user"
          />
          <TextInput
            label="First name:"
            value={this.state.firstName}
            onChange={this.handleInputChange}
            name="firstName"
            width="100%"
            isRequired={true}
          />
          <TextInput
            label="Last name:"
            value={this.state.lastName}
            onChange={this.handleInputChange}
            name="lastName"
            width="100%"
            isRequired={true}
          />
          <TextInput
            label="E-mail:"
            value={this.state.email}
            onChange={this.handleInputChange}
            name="email"
            width="100%"
            isRequired={true}
          />
          <TextInput
            label="Password:"
            value={this.state.password}
            onChange={this.handleInputChange}
            name="password"
            width="100%"
            type="password"
            isRequired={true}
          />
          <PrimaryButton
            text="Save"
            type="light"
            width="100px"
            onClick={() => this.createNewAccount(this.state)}
          />
        </div>
      </div>
    )
  }
}

export default RegisterUser;
