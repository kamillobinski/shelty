import React from "react";
import { getUsers, getUserIdFromCookie, deleteUser } from '../../../api/UserApiFunctions';
import { checkIfAdmin } from '../../../functions/Functions';
import PrimaryButton from "../../button/PrimaryButton";
import TextInput from "../../input/text/TextInput";
import "./manageaccounts.css";

const initialState = {
  users: [], loggedUserId: ""
};

export default class ManageAccounts extends React.Component {
  constructor() {
    super();
    this.state = initialState;
    this.renderUser = this.renderUser.bind(this);
    this.removeUser = this.removeUser.bind(this);
    this.resetState = this.resetState.bind(this);
    this.getAccounts = this.getAccounts.bind(this);
  }

  componentDidMount() {
    checkIfAdmin();
    this.setState({ loggedUserId: getUserIdFromCookie() })
    this.getAccounts();
  }

  getAccounts() {
    getUsers().then((res) => {
      this.setState({ users: res.data });
    })
  }

  renderUser(user, i, loggedUserId) {
    if (user.id !== loggedUserId) {
      return (
        <div className="manageAccounts-inner-list-item" key={i} >
          <TextInput
            key={user.id}
            type="text"
            label={user.roles[0].name.substring(5) + " #" + i}
            name="user"
            value={user.username}
            width="100%"
            height="30px"
            margin="0 120px 0 0"
            readOnly={true}
          />
          <div className="manageAccounts-inner-list-item-delete-btn">
            <PrimaryButton
              text="Remove"
              width="100px"
              type="red"
              onClick={() => this.removeUser(user.id)}
            />
          </div>
        </div>
      )
    } else {
      return (
        <div className="manageAccounts-inner-list-item" key={i}>
          <TextInput
            key={user.id}
            type="text"
            label={user.roles[0].name.substring(5) + " #" + i}
            name="user"
            value={user.username}
            width="100%"
            height="30px"
            margin="0 120px 0 0"
            readOnly={true}
          />
        </div>
      )
    }
  }

  removeUser(id) {
    deleteUser(id).then(() => {
      alert('user removed');
      this.resetState();
    })
  }

  resetState() {
    this.setState(initialState);
    this.getAccounts();
  }

  render() {
    return (
      <div className="manageAccounts">
        <div className="manageAccounts-inner">
          <div className="manageAccounts-inner-list">
            {this.state.users.map((user, i) => (
              this.renderUser(user, i, this.state.loggedUserId)
            ))}
          </div>
        </div>
      </div >
    );
  }
}
