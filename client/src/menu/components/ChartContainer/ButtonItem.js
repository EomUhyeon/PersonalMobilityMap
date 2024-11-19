import React from 'react';
import { Button } from 'react-bootstrap';

const ButtonItem = ({ variant, onClick, children }) => (
  <Button variant={variant} onClick={onClick}>
    {children}
  </Button>
);

export default ButtonItem;