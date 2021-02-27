import React from 'react';
import { Navbar, Nav, Button, Form, FormControl } from 'react-bootstrap';

function NavBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Images as a Service</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#favorites">Favorites</Nav.Link>
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-info">Search</Button>
      </Form>
    </Navbar>
  )
}

export default NavBar;
