import React from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';

function Search() {
  return (
    <div id="search">
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-info">Search</Button>
      </Form>
    </div>
  );
}

export default Search;
