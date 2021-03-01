import React, { useState, useContext } from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';
import { AppContext } from './context/Context';
import { addToFavorites } from './utils/requests';

/**
 * @function Image
 * GIF card component. It renders the GIF itself, and provides possibility to add the GIF to the user's list of favorites.
 */

export default function Image(props) {
  const [loading, setLoading] = useState(false);

  const appContext = useContext(AppContext);

  const setAsFavorite = () => {
    setLoading(true);

    addToFavorites(props.id, handleResponse, handleError);
  };

  const handleResponse = () => {
    setLoading(false);
    // Display toast!
  };

  const handleError = () => {
    setLoading(false);

    appContext.updateError(true);
  };

  const handleOnClick = (event) => {
    event.preventDefault();
    setAsFavorite();
  };

  return (
    <Card>
      <Card.Img variant="top" src={props.url} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Button variant="info" onClick={handleOnClick}>
          {loading ? <Spinner as="span" animation="border" variant="light" size="sm" role="status" /> : 'Add to favorites'}
        </Button>
      </Card.Body>
    </Card>
  );
}
