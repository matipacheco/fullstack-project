import React, { Fragment, useContext, useState } from 'react';
import { AppContext } from './context/Context';
import { addToFavorites } from './utils/requests';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';

/**
 * @function Image
 * GIF card component. It renders the GIF itself, and provides possibility to add the GIF to the user's list of favorites.
 */

export default function Image(props) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const appContext = useContext(AppContext);

  const toastConfig = {
    position: 'top-right',
    autoClose: 4000,
    draggable: false,
    closeOnClick: true,
    pauseOnHover: false,
    hideProgressBar: false,
  };

  const setAsFavorite = () => {
    addToFavorites({ gifId: props.id, searchTerm: appContext.searchTerm }, handleResponse, handleError);
  };

  const handleResponse = (response) => {
    if (response.errors) {
      return toast.warn(response.errors[0], toastConfig);
    }

    toast.success('GIF added to your favorites! 🤘🏾', toastConfig);
  };

  const handleError = () => {
    appContext.updateError(true);
  };

  const handleOnClick = (event) => {
    event.preventDefault();
    setAsFavorite();
  };

  return (
    <figure>
      <img src={props.url} alt={props.title} onLoad={() => setImageLoaded(true)} />
      {
        <AddToFavorites
          id={props.id}
          imageLoaded={imageLoaded}
          handleOnClick={handleOnClick}
          alreadyStarred={props.search_term}
        />
      }
    </figure>
  );
}

function AddToFavorites(props) {
  const [favoriteChecked, setFavoriteChecked] = useState(props.alreadyStarred);

  const handleCLick = (event) => {
    event.preventDefault();

    setFavoriteChecked(true);
    props.handleOnClick(event);
  };

  return (
    <figcaption>
      {props.imageLoaded ? (
        <Fragment>
          <input id={`toggle-heart-${props.id}`} type="checkbox" checked={favoriteChecked} />
          <label htmlFor={`toggle-heart-${props.id}`} onClick={handleCLick}>
            ❤
          </label>
        </Fragment>
      ) : (
        <Spinner as="span" animation="border" variant="dark" size="sm" role="status" />
      )}
    </figcaption>
  );
}
