import React, { useState, useContext } from 'react';
import { AppContext } from './context/Context';
import { Spinner, Button } from 'react-bootstrap';
import { search } from './utils/requests';
import { handleEnterKey } from './utils/accessibility';
import _ from 'lodash';

/**
 * @function Search
 * Component in charge of handling GIF search
 * It updates the search result in the application context
 */

export default function Search() {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const appContext = useContext(AppContext);

  const handleSearch = () => {
    setLoading(true);

    if (!_.isEmpty(appContext.images)) {
      appContext.updateImages([]);
    }

    search(searchTerm, handleSuccess, handleError);
  };

  const handleSuccess = (response) => {
    if (appContext.error) {
      appContext.updateError(false);
    }

    appContext.updateImages(response);
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);

    if (!_.isEmpty(appContext.images)) {
      appContext.updateImages([]);
    }

    appContext.updateError(true);
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

    handleEnterKey(event, handleSearch);
  };

  return (
    <div id="search">
      <input
        type="text"
        className="form-control mr-sm-2"
        placeholder="What are you looking for?"
        onKeyUp={handleOnKeyUp}
        onChange={handleOnChange}
      />

      <Button className="btn btn-info" onClick={handleOnClick} disabled={loading}>
        {loading ? <Spinner as="span" animation="border" variant="light" size="sm" role="status" /> : 'Search'}
      </Button>
    </div>
  );
}
