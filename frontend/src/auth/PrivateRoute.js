import React from "react";
import Cookies from "universal-cookie";
import { getAuthTokenFromCookie } from "../api/UserApiFunctions";
import { TokenValidation } from "./TokenValidation";
import { Route, Redirect } from "react-router-dom";

class PrivateRoute extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: true,
      isAuthenticated: false,
      isAuthTokenValid: false,
      authToken: "",
    };
    this.cookie = new Cookies();
  }

  async componentDidMount() {
    var authToken = await getAuthTokenFromCookie();
    this.setState({ authToken: authToken });

    if (authToken !== undefined && authToken !== "") {
      var isAuthTokenValid = await TokenValidation();
      this.setState({ isAuthenticated: isAuthTokenValid, isLoading: false });
    } else {
      this.setState({ isLoading: false });
    }
  }

  render() {
    return this.state.isLoading ? null : this.state.isAuthenticated ? (
      <Route path={this.props.path} component={this.props.component} />
    ) : (
      <Redirect
        to={{
          pathname: "/403",
          state: { from: this.props.location },
        }}
      />
    );
  }
}

export default PrivateRoute;
