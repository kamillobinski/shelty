import React from "react";
import DefaultAvatar from "../../avatar/default/DefaultAvatar";
import IconButton from "../../button/IconButton";
import { Link } from "react-router-dom";
import "./defaultheader.css";

const DefaultHeader = (props) => {
  return (
    <div className="defaultHeader">
      <div className="defaultHeader-inner">
        <Link to="/admin/animal/update">
          <div className="defaultHeader-inner-logo">
            <div className="defaultHeader-inner-logo-inner">
              <span>Shelty</span>
            </div>
          </div>
        </Link>
        <div className="defaultHeader-inner-right-content">
          <div className="defaultHeader-inner-right-content-buttons">
            <div className="defaultHeader-inner-right-content-buttons-centered">
              <Link to="/admin/settings">
                <IconButton
                  width="30px"
                  height="30px"
                  type="settings"
                  rotate={true}
                />
              </Link>
            </div>
          </div>
          <div
            className={
              "defaultHeader-inner-right-content-avatar" +
              (props.buttonClickAnimation ? " click-animation" : "")
            }
          >
            <div className="defaultHeader-inner-right-content-avatar-centered">
              <DefaultAvatar
                width="30px"
                height="30px"
                image={props.userAvatar}
                type="user"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultHeader;
