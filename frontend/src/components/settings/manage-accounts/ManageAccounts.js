import React from "react";
import { getUsers } from '../../../api/UserApiFunctions';
import { getUserIdFromCookie } from '../../../api/UserApiFunctions';
import { checkIfAdmin } from '../../../functions/Functions';
import PrimaryButton from "../../button/PrimaryButton";
import TextInput from "../../input/text/TextInput";
import "./manageaccounts.css";

export default class ManageAccounts extends React.Component {
  constructor() {
    super();
    this.state = { users: [], loggedUserId: getUserIdFromCookie() };
    this.renderUser = this.renderUser.bind(this);
  }

  componentDidMount() {
    checkIfAdmin();
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
            label={"User #" + i}
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
            />
          </div>
        </div>
      )
    } else {
      return null;
    }
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
