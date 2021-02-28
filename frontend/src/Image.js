import React from 'react';

import { Card, Button } from 'react-bootstrap';

export default function Images(props) {
  return (
    <Card>
      <Card.Img variant="top" src={props.images.fixed_height_small.url} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Button variant="info">Add to favorites</Button>
      </Card.Body>
    </Card>
  );
}
