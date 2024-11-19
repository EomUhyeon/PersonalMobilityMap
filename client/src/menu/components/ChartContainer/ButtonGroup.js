import React from 'react';
import { Button, ButtonGroup as BootstrapButtonGroup } from 'react-bootstrap';
import './ButtonGroup.css';

const ButtonItem = ({ variant, onClick, children }) => (
  <Button variant={variant} onClick={onClick}>
    {children}
  </Button>
);

const ButtonGroup = ({ setView }) => (
  <BootstrapButtonGroup className="mb-3">
    <ButtonItem variant="primary" onClick={() => setView('chart')}>
      전체 위반
    </ButtonItem>
    <ButtonItem variant="secondary" onClick={() => setView('list')}>
      위반 항목
    </ButtonItem>
  </BootstrapButtonGroup>
);

export default ButtonGroup;