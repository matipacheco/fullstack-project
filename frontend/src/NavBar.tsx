import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';

export default function NavBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">GIFs as a Service</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#favorites">Favorites</Nav.Link>
      </Nav>

      <Button variant="info">Login</Button>
    </Navbar>
  )
}
