import React from "react";
import "./settingsmenu.css";
import { Link } from "react-router-dom";

const SettingsMenu = (props) => {
  return (
    <div className="settingsMenu">
      <div className="settingsMenu-list">
        <div className="settingsMenu-item">
          <span>Account</span>
          <Link to="/admin/settings/account/edit">
            <div className="settingsMenu-item-subitem">
              <span>• Edit personal information</span>
            </div>
          </Link>
        </div>
        <div className="settingsMenu-item">
          <span>Users</span>
          <Link to="/admin/settings/users/register">
            <div className="settingsMenu-item-subitem">
              <span>• Register new account</span>
            </div>
          </Link>
          <Link to="/admin/settings/users/manage">
            <div className="settingsMenu-item-subitem">
              <span>• Manage accounts</span>
            </div>
          </Link>
        </div>
        <div className="settingsMenu-item">
          <span>Animal</span>
          <Link to="/admin/settings/breed/edit">
            <div className="settingsMenu-item-subitem">
              <span>• Manage breed</span>
            </div>
          </Link>
          <Link to="/admin/settings/species/edit">
            <div className="settingsMenu-item-subitem">
              <span>• Manage species</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SettingsMenu;
