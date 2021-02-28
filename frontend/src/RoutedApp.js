import React from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';

import App from './App';
import Signup from './Signup';
import NavBar from './NavBar';
import Login from './Login';

/**
 * @function RoutedApp
 * Wrapper. That connects the entire app with the router
 */

export default function RoutedApp() {
  let history = useHistory();

  return (
    <Router history={history}>
      <NavBar />

      <Switch>
        <Route exact path="/signup">
          <Signup />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>

        <Route path="/">
          <App />
        </Route>
      </Switch>
    </Router>
  )
};