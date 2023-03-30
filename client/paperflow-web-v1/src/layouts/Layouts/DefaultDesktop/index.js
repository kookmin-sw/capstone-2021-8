import React from 'react';
import {
  Container,
} from 'react-bootstrap';
import NavBar from '../../../components/NavBar';
import Footer from '../../../components/Footer';

const DefaultDesktopLayout = ({ children, className }) => (
  <div className={className}>
    <NavBar />
    <Container style={{ marginTop: '20px' }} fluid="lg">
      {children}
    </Container>
    <Footer />
  </div>
);

export default DefaultDesktopLayout;
