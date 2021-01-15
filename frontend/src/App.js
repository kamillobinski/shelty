import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AnimalUpdate from "./containers/animal-update/AnimalUpdate";
import Blog from './containers/blog/Blog';
import SignIn from "./containers/sign-in/SignIn";
import Settings from "./containers/settings/Settings";
import Home from "./containers/home/Home";
import Animals from "./components/home/animals-all/Animals";
import AnimalFinder from "./components/home/animal-finder/AnimalFinder";
import HttpError from "./components/http-error/HttpError";
import PrivateRoute from "./auth/PrivateRoute";
import "./utils/styles/app.css";
import AnimalPreview from "./components/home/animal-preview/AnimalPreview";
import PublicBlog from './components/home/blog/Blog';
import PublicBlogPost from './components/home/blog/PublicBlogPost';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          {/* Public paths */}
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/" component={Home} />
          <Route exact path="/animals" component={Animals} />
          <Route exact path="/animal/:id" component={AnimalPreview} />
          <Route exact path="/finder" component={AnimalFinder} />
          <Route exact path="/blog" component={PublicBlog} />
          <Route exact path="/blog/post/:id" component={PublicBlogPost} />
          {/* Admin paths */}
          <PrivateRoute
            exact
            path="/admin/animal/update"
            component={AnimalUpdate}
          />
          <PrivateRoute
            exact path="/admin/blog"
            component={Blog}
          />
          <PrivateRoute path="/admin/settings" component={Settings} />
          {/* Error paths */}
          <Route path="/404" component={HttpError} />
          <Route path="/403" component={HttpError} />
          <Redirect from="*" to="/404" />
        </Switch>
      </Router>
    );
  }
}
