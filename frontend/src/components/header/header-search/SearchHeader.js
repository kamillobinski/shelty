import React from "react";
import DefaultAvatar from "../../avatar/default/DefaultAvatar";
import SearchBar from "../../search-bar/SearchBar";
import IconButton from "../../button/IconButton";
import { Link } from "react-router-dom";
import "./searchheader.css";

const SearchHeader = (props) => {
  return (
    <div className="searchHeader">
      <div className="searchHeader-inner">
        <Link to="/admin/animal/update">
          <div className="searchHeader-inner-logo">
            <div
              className="searchHeader-inner-logo-inner"
              onClick={props.showMainMenu}
            >
              <span>Shelty</span>
            </div>
          </div>
        </Link>
        <div className="searchHeader-inner-search">
          <SearchBar submitSearchInput={props.submitSearchInput} />
        </div>
        <div className="searchHeader-inner-right-content">
          <div className="searchHeader-inner-right-content-buttons">
            <div className="searchHeader-inner-right-content-buttons-centered">
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
              "searchHeader-inner-right-content-avatar" +
              (props.buttonClickAnimation ? " click-animation" : "")
            }
          >
            <div className="searchHeader-inner-right-content-avatar-centered">
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

export default SearchHeader;
