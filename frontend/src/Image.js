import React from 'react';
import { Card, Button } from 'react-bootstrap';

/**
 * @function Image
 * GIF card component. It renders the GIF itself, and provides possibility to add the GIF to the user's list of favorites.
 */

export default function Image(props) {
  return (
    <Card>
      <Card.Img variant="top" src={props.url} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Button variant="info">Add to favorites</Button>
      </Card.Body>
    </Card>
  );
}
