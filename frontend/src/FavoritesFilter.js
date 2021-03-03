import React, { useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { handleEnterKey } from './utils/accessibility';

/**
 * @function FavoritesFilter
 * Search bar used to filter the favorites list.
 */

export default function FavoritesFilter(props) {
  const searchBarRef = useRef(null);

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
    props.setFilterTerm(searchBarRef.current.value);
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
          🔎
        </span>
      </Button>
    </div>
  );
}
