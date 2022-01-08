import React from "react";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";

function SettingsNav(props) {
  return (
    <Nav variant="pills" {...props}>
      <Nav.Item>
        <LinkContainer to="/settings/general">
          <Nav.Link eventKey="general">General</Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/settings/password">
          <Nav.Link eventKey="password">Password</Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/settings/billing">
          <Nav.Link eventKey="billing">Billing</Nav.Link>
        </LinkContainer>
      </Nav.Item>
    </Nav>
  );
}

export default SettingsNav;
