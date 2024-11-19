import React from 'react';
import { Button } from 'react-bootstrap';

const ViolationItem = ({ item }) => (
  <li>
    {item} <Button variant="outline-primary" size="sm">+</Button>
  </li>
);

export default ViolationItem;