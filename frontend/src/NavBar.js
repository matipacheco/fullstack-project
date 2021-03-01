import React, { useContext, Fragment } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { AppContext } from './context/Context';

import Logout from './Logout';
import _ from 'lodash';

/**
 * @function NavBar
 * Simple nav bar that allows access to Favorites and Authentication sections.
 */

export default function NavBar() {
  let history = useHistory();
  const appContext = useContext(AppContext);

  const redirectTo = (route) => {
    history.push(route);
  };

  return (
    <Navbar bg="dark" variant="dark">
      <div className="navbar-brand" onClick={() => redirectTo('/')}>
        EverlyGIFs
      </div>

      <Nav className="mr-auto">
        {!_.isEmpty(appContext.user) && (
          <Nav.Link href="#favorites">Favorites <span role="img" aria-label="heart">❤️</span></Nav.Link>
        )}
      </Nav>

      <div className="button-group">
        {_.isEmpty(appContext.user) ? (
          <Fragment>
            <div className="btn btn-success" onClick={() => redirectTo('/signup')}>
              Sign up
            </div>

            <div className="btn btn-info" onClick={() => redirectTo('/login')}>
              Login
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <h3>{appContext.user.username}</h3>

            <Logout />
          </Fragment>
        )}
      </div>
    </Navbar>
  );
}
