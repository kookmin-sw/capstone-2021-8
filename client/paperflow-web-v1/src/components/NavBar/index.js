import React from 'react';
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';
import {
  HeaderEntireMain,
} from '../../assets/strings/Menu/Main';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';

const NavBar = () => {
  const { screenClass, changeMainMenu } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
    changeMainMenu: appStore.changeMainMenu,
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/" className={styles.logo}>PaperFlow</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {
            HeaderEntireMain.map((item) => (
              <Nav.Link key={item.name} href="/">{item.name}</Nav.Link>
            ))
          }
        </Nav>
        <Form inline>
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                changeMainMenu(`/search?search=${e.target.value}`);
              }
            }}
          />
          <Button variant="outline-primary" style={{ marginLeft: '10px' }}>Login</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
