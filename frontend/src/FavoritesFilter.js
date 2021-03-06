import React, { useEffect, useRef, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { handleEnterKey } from './utils/accessibility';

/**
 * @function FavoritesFilter
 * Search bar used to filter the favorites list.
 */

export default function FavoritesFilter(props) {
  const searchBarRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    searchBarRef.current.focus();
  }, []);

  const handleOnKeyUp = (event) => {
    event.preventDefault();
    handleEnterKey(event, filterResults);
  };

  const handleOnClick = (event) => {
    event.preventDefault();
    filterResults();
  };

  const filterResults = () => {
    setLoading(true);
    props.setFilterTerm(searchBarRef.current.value);
    setLoading(false);
  };

  return (
    <div id="search">
      <input
        type="text"
        ref={searchBarRef}
        className="form-control mr-sm-2"
        placeholder="Browse your favorite GIFs"
        onKeyUp={handleOnKeyUp}
      />

      <Button className="btn btn-info" onClick={handleOnClick}>
        <span title="Browser you favorites" role="img" aria-label="magnifier-glass">
          {loading ? <Spinner as="span" animation="border" variant="dark" size="sm" role="status" /> : '🔎'}
        </span>
      </Button>
    </div>
  );
}
