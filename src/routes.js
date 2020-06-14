import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Credentials from "./pages/Credentials";
import Favorites from "./pages/Favorites";
import About from "./pages/About";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/profile/credentials" component={Credentials} />
        <Route path="/favorites" exact component={Favorites} />
        <Route path="/about" exact component={About} />
      </Switch>
    </BrowserRouter>
  );
}
