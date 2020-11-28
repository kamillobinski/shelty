import React from "react";
import { SearchIcon } from "../../utils/icons/Icons";
import "./searchbar.css";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchInput: "" };
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  handleSearchInputChange(event) {
    if (event.target.name === "searchInput") {
      this.setState({ searchInput: event.target.value });
      this.handleSearchSubmit();
    }
  }

  handleSearchKeyPress = (event) => {
    if (event.key === "Enter") {
      this.handleSearchSubmit();
    }
  };

  handleSearchSubmit() {
    this.props.submitSearchInput(this.state.searchInput);
  }

  render() {
    return (
      <div className="searchBar">
        <div className="searchBar-inner">
          <button
            className="searchBar-inner-button"
            onClick={this.handleSearchSubmit}
          >
            <div className="searchBar-inner-button-icon">
              <SearchIcon height="12" />
            </div>
          </button>
          <input
            name="searchInput"
            type="text"
            className="searchBar-inner-input"
            placeholder="Search..."
            spellCheck="false"
            autoComplete="off"
            value={this.state.searchInput}
            onChange={this.handleSearchInputChange}
            onKeyPress={this.handleSearchKeyPress}
          />
        </div>
      </div>
    );
  }
}

export default SearchBar;
