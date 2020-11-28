import React from "react";
import EditAccount from "../../settings/edit-account/EditAccount";
import EditBreed from "../edit-breed/EditBreed";
import EditSpecies from "../edit-species/EditSpecies";
import RegisterUser from "../register-user/RegisterUser";
import ManageAccounts from '../manage-accounts/ManageAccounts';
import { Route } from "react-router-dom";
import "./settingscontainer.css";

class SettingsContainer extends React.Component {
  render() {
    return (
      <div className="settingsContainer">
        <Route
          exact
          path="/admin/settings/account/edit"
          component={EditAccount}
        />
        <Route exact path="/admin/settings/breed/edit" component={EditBreed} />
        <Route
          exact
          path="/admin/settings/species/edit"
          component={EditSpecies}
        />
        <Route
          exact
          path="/admin/settings/users/register"
          component={RegisterUser}
        />
        <Route
          exact
          path="/admin/settings/users/manage"
          component={ManageAccounts}
        />
      </div>
    );
  }
}

export default SettingsContainer;
