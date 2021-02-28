import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

/**
 * @function NavBar
 * Simple nav bar that allows access to Favorites and Authentication sections.
 */

export default function NavBar() {
  let history = useHistory();

  const redirecTo = (route) => {
    history.push(route);
  };

  return (
    <Navbar bg="dark" variant="dark">
      <div className="navbar-brand" onClick={() => redirecTo('/')}>
        GIFs as a Service
      </div>

      <Nav className="mr-auto">
        <Nav.Link href="#favorites">Favorites</Nav.Link>
      </Nav>

      <div className="button-group">
        <div className="btn btn-success" onClick={() => redirecTo('/signup')}>
          Sign up
        </div>
        <div className="btn btn-info" onClick={() => redirecTo('/login')}>
          Login
        </div>
      </div>
    </Navbar>
  );
}
