import React, { useContext, useState } from 'react';
import { AppContext } from './context/Context';
import { addToFavorites } from './utils/requests';
import { toast } from 'react-toastify';
import { OverlayTrigger, Popover, Spinner } from 'react-bootstrap';

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
      {!props.favorite && <AddToFavorites imageLoaded={imageLoaded} handleOnClick={handleOnClick} />}
    </figure>
  );
}

function AddToFavorites(props) {
  return (
    <figcaption className={!props.imageLoaded ? 'image-disabled' : ''} onClick={props.handleOnClick}>
      {props.imageLoaded ? (
        <OverlayTrigger
          placement="right"
          delay={{ show: 50, hide: 50 }}
          overlay={<Popover id="add-favorite">Add to favorites</Popover>}
        >
          <span role="img" aria-label="heart">
            ❤️
          </span>
        </OverlayTrigger>
      ) : (
        <Spinner as="span" animation="border" variant="dark" size="sm" role="status" />
      )}
    </figcaption>
  );
}
