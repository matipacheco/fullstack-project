import React from 'react';

import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import App from './App';
import Signup from './Signup';
import NavBar from './NavBar';
import Login from './Login';
import ProviderWrapper from './context/ContextProvider';
import Favorites from './Favorites';
import { NetworkErrorView } from './utils/commons';
import { ToastContainer } from 'react-toastify';

/**
 * @function AppWrapper
 * Wrapper. That connects the entire app with the router
 */

export default function AppWrapper() {
  let history = useHistory();

  return (
    <Router history={history}>
      <ProviderWrapper>
        <ToastContainer />
        <NavBar />

        <NetworkErrorView />

        <Switch>
          <Route exact path="/signup">
            <Signup />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/favorites">
            <Favorites />
          </Route>

          <Route path="/">
            <App />
          </Route>
        </Switch>
      </ProviderWrapper>
    </Router>
  );
}
