import React from 'react';
import {
  Navbar,
  Container,
  NavbarBrand,
} from 'react-bootstrap';

const Footer = ({ screenClass }) => {
  // eslint-disable-next-line no-unused-vars
  const isDesktop = screenClass === 'xl';
  // const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;

  return (
    <Navbar color="dark" dark>
      <Container>
        <NavbarBrand>PaperFlow</NavbarBrand>
        <p>Copyright © 2021 by Team 8. All Rights Reserved</p>
      </Container>
    </Navbar>
  );
};

export default Footer;
