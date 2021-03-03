import React, { useState, useContext, useEffect, useRef } from 'react';
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
  const searchBarRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [emptySearchError, setEmptySearchError] = useState(false);

  const appContext = useContext(AppContext);

  useEffect(() => {
    searchBarRef.current.focus();
  }, []);

  const handleSearch = () => {
    if (_.isEmpty(searchBarRef.current.value)) {
      return setEmptySearchError(true);
    }

    setLoading(true);
    setEmptySearchError(false)
    search(searchBarRef.current.value, handleSuccess, handleError);
  };

  const handleSuccess = (response) => {
    if (appContext.error) {
      appContext.updateError(false);
    }

    setLoading(false);
    appContext.updateImages(response);
    appContext.updateSearchTerm(searchBarRef.current.value);
  };

  const handleError = () => {
    setLoading(false);

    if (!_.isEmpty(appContext.images)) {
      appContext.updateImages([]);
    }

    appContext.updateError(true);
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
        ref={searchBarRef}
        className="form-control mr-sm-2"
        placeholder="Find a cool GIF!"
        onKeyUp={handleOnKeyUp}
      />

      <Button className="btn btn-info" onClick={handleOnClick} disabled={loading}>
        {loading ? <Spinner as="span" animation="border" variant="light" size="sm" role="status" /> : 'Search 🔎'}
      </Button>

      {
        emptySearchError && (
          <small className="red">Type something out</small>
        )
      }
    </div>
  );
}
