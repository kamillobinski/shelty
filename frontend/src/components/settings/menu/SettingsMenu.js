import React from "react";
import "./settingsmenu.css";
import { NavLink } from "react-router-dom";

const SettingsMenu = (props) => {
  return (
    <div className="settingsMenu">
      <div className="settingsMenu-list">
        <div className="settingsMenu-item">
          <span>Account</span>
          <NavLink to="/admin/settings/account/edit" activeClassName='active'>
            <div className="settingsMenu-item-subitem">
              <span>• Edit personal information</span>
            </div>
          </NavLink>
        </div>
        <div className="settingsMenu-item">
          <span>Users</span>
          <NavLink to="/admin/settings/users/register" activeClassName='active'>
            <div className="settingsMenu-item-subitem">
              <span>• Register new account</span>
            </div>
          </NavLink>
          <NavLink to="/admin/settings/users/manage" activeClassName='active'>
            <div className="settingsMenu-item-subitem">
              <span>• Manage accounts</span>
            </div>
          </NavLink>
        </div>
        <div className="settingsMenu-item">
          <span>Animal</span>
          <NavLink to="/admin/settings/breed/edit" activeClassName='active'>
            <div className="settingsMenu-item-subitem">
              <span>• Manage breed</span>
            </div>
          </NavLink>
          <NavLink to="/admin/settings/species/edit" activeClassName='active'>
            <div className="settingsMenu-item-subitem">
              <span>• Manage species</span>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SettingsMenu;
