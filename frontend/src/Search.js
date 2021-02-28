import React, { useState, useContext } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';

import { AppContext } from './context/Context';

import { search } from './utils/requests';

export default function Search() {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const appContext = useContext(AppContext);

  const handleSearch = () => {
    setLoading(true);
    search(searchTerm, handleSuccess, handleError);
  };

  const handleSuccess = (response) => {
    appContext.updateImages(response);
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
  };

  const handleOnChange = (event) => {
    event.preventDefault();

    setSearchTerm(event.target.value);
  };

  const handleOnClick = (event) => {
    event.preventDefault();
    handleSearch();
  };

  const handleOnKeyUp = (event) => {
    event.preventDefault();

    if (event.keyCode === 13 || event.key === 'ENTER') {
      handleSearch();
    }
  };

  return (
    <div id="search">
      <Form inline>
        <input
          type="text"
          className="form-control mr-sm-2"
          placeholder="What are you looking for?"
          onKeyUp={handleOnKeyUp}
          onChange={handleOnChange}
        />

        <Button variant="outline-info" onClick={handleOnClick}>
          {loading ? <Spinner animation="border" variant="primary" size="sm" /> : 'Search'}
        </Button>
      </Form>
    </div>
  );
}
