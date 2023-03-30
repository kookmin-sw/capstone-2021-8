import React from 'react';
import {
  Navbar,
  Container,
  NavbarBrand,
} from 'react-bootstrap';
import useRootData from '../../hooks/useRootData';

const Footer = () => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  // eslint-disable-next-line no-unused-vars
  const isDesktop = screenClass === 'xl';

  // const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;

  return (
    <Navbar>
      <Container>
        <NavbarBrand>PaperFlow</NavbarBrand>
        <p>Copyright © 2021 by Team 8. All Rights Reserved</p>
      </Container>
    </Navbar>
  );
};

export default Footer;
