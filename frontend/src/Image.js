import React, { Fragment, useContext, useState } from 'react';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
import { AppContext } from './context/Context';
import { addToFavorites, removeFromFavorites } from './utils/requests';

/**
 * @function Image
 * GIF card component. It renders the GIF itself, and provides possibility to add the GIF to the user's list of favorites.
 */

export default function Image(props) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(!_.isEmpty(props.search_term));

  const appContext = useContext(AppContext);

  const toastConfig = {
    position: 'top-right',
    autoClose: 4000,
    draggable: false,
    closeOnClick: true,
    pauseOnHover: false,
    hideProgressBar: false,
  };

  const handleOnClick = (event) => {
    event.preventDefault();

    if (isFavorite) {
      setIsFavorite(false);
      return removeFavorite();
    }

    setIsFavorite(true);
    return setAsFavorite();
  };

  const removeFavorite = () => {
    removeFromFavorites({ gifId: props.id }, handleResponse, handleError);
  };

  const setAsFavorite = () => {
    addToFavorites({ gifId: props.id, searchTerm: appContext.searchTerm }, handleResponse, handleError);
  };

  const handleResponse = (response) => {
    if (response.errors) {
      return toast.warn(response.errors[0], toastConfig);

    } else if (response.success && response.status === 204) {
      toast.info('GIF removed from you favorites ', toastConfig);

    } else if (response.success && response.status === 201) {
      toast.success('GIF added to your favorites! 🤘🏾', toastConfig);
    }
  };

  const handleError = () => {
    appContext.updateError(true);
  };

  return (
    <figure>
      <img src={props.url} alt={props.title} onLoad={() => setImageLoaded(true)} />
      {!props.favorite && (
        <AddToFavorites
          id={props.id}
          isFavorite={isFavorite}
          imageLoaded={imageLoaded}
          handleOnClick={handleOnClick}
          setIsFavorite={setIsFavorite}
          userLogged={!_.isEmpty(appContext.user)}
        />
      )}
    </figure>
  );
}

/**
 * @function AddToFavorites
 * Image subcomponent. It renders the caption that holds the like (❤️) button.
 */

function AddToFavorites(props) {
  const handleCLick = (event) => {
    event.preventDefault();
    props.handleOnClick(event);
  };

  return (
    <figcaption>
      {props.imageLoaded ? (
        <Fragment>
          <input id={`toggle-heart-${props.id}`} type="checkbox" checked={props.isFavorite} />
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
