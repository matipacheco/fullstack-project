import React, { useContext } from 'react';
import { AppContext } from './context/Context';
import { addToFavorites } from './utils/requests';

/**
 * @function Image
 * GIF card component. It renders the GIF itself, and provides possibility to add the GIF to the user's list of favorites.
 */

export default function Image(props) {
  const appContext = useContext(AppContext);

  const setAsFavorite = () => {
    addToFavorites(props.id, handleResponse, handleError);
  };

  const handleResponse = () => {
    // Display toast!
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
      <img src={props.url} alt={props.title} />
      <figcaption><span title="Add to favorites" role="img" aria-label="heart" onClick={handleOnClick}>❤️</span></figcaption>
    </figure>
  );
}
