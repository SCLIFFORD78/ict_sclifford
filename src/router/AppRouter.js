import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import RedirectPage from "../components/RedirectPage";
import Dashboard from "../pages/Dashboard";
import NotFoundPage from "../pages/NotFoundPage";
import UserPlaylists from "../pages/UserPlaylists";
//import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SiteHeader from "../components/SiteHeader";
import PlayListAlbumPage from "../pages/PlayListAlbumPage";
import AlbumTracksPage from "../pages/AlbumTracksPage";
import SearchPage from "../pages/SearchPage";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  offset: theme.mixins.toolbar,
}));


class AppRouter extends React.Component {
  state = {
    expiryTime: "0",
  };
  componentDidMount() {
    let expiryTime;
    try {
      expiryTime = JSON.parse(localStorage.getItem("expiry_time"));
    } catch (error) {
      expiryTime = "0";
    }
    this.setState({ expiryTime });
  }
  setExpiryTime = (expiryTime) => {
    this.setState({ expiryTime });
  };
  isValidSession = () => {
    const currentTime = new Date().getTime();
    const expiryTime = this.state.expiryTime;
    const isSessionValid = currentTime < expiryTime;

    return isSessionValid;
  };
  render() {
    return (
      <BrowserRouter>
        <SiteHeader />
        <div className="main">
          <Switch>
            <Route
              path="/"
              exact={true}
              render={(props) => (
                <Home isValidSession={this.isValidSession} {...props} />
              )}
            />
            <Route
              path="/redirect"
              render={(props) => (
                <RedirectPage
                  isValidSession={this.isValidSession}
                  setExpiryTime={this.setExpiryTime}
                  {...props}
                />
              )}
            />
            <Route
              path="/dashboard"
              render={(props) => (
                <Dashboard isValidSession={this.isValidSession} {...props} />
              )}
            />
            <Route
              path="/search"
              render={(props) => (
                <SearchPage isValidSession={this.isValidSession} {...props} />
              )}
            />
            <Route
              path="/userplaylists"
              render={(props) => (
                <UserPlaylists
                  isValidSession={this.isValidSession}
                  //setExpiryTime={this.setExpiryTime}
                  {...props}
                />
              )}
            />
            <Route
              path="/userplaylistalbum/:id/:removeItem"
              render={(props) => (
                <PlayListAlbumPage
                  isValidSession={this.isValidSession}
                  //setExpiryTime={this.setExpiryTime}
                  {...props}
                />
              )}
            />
            <Route
              path="/userplaylistalbum/:id"
              render={(props) => (
                <PlayListAlbumPage
                  isValidSession={this.isValidSession}
                  //setExpiryTime={this.setExpiryTime}
                  {...props}
                />
              )}
            />

            <Route
              path="/albumTracksPage/:id"
              render={(props) => (
                <AlbumTracksPage isValidSession={this.isValidSession} {...props} />
              )}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default AppRouter;
