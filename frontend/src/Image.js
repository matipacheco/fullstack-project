import React from 'react';

import { Card, Button } from 'react-bootstrap';

export default function Images(props) {
  debugger
  return (
    <Card>
      <Card.Img variant="top" src={props.url} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Button variant="info">Add to favorites</Button>
      </Card.Body>
    </Card>
  )
}
