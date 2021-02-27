import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';

function NavBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Images as a Service</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#favorites">Favorites</Nav.Link>
      </Nav>

      <Button variant="info">Login</Button>
    </Navbar>
  )
}

export default NavBar;
