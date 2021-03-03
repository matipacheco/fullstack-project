import React, { useContext, useState } from 'react';
import { AppContext } from './context/Context';
import { addToFavorites } from './utils/requests';
import { toast } from 'react-toastify';

/**
 * @function Image
 * GIF card component. It renders the GIF itself, and provides possibility to add the GIF to the user's list of favorites.
 */

export default function Image(props) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const appContext = useContext(AppContext);

  const toastConfig = {
    position: "top-right",
    autoClose: 4000,
    draggable: false,
    closeOnClick: true,
    pauseOnHover: false,
    hideProgressBar: false,
  };

  const setAsFavorite = () => {
    addToFavorites(props.id, handleResponse, handleError);
  };

  const handleResponse = (response) => {
    if (response.errors) {
      return toast.info(response.errors[0], toastConfig);
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
      {!props.favorite && imageLoaded && (
        <figcaption>
          <span title="Add to favorites" role="img" aria-label="heart" onClick={handleOnClick}>
            ❤️
          </span>
        </figcaption>
      )}
    </figure>
  );
}
