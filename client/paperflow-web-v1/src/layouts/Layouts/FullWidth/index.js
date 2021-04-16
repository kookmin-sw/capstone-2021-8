import React from 'react';
import NavBar from '../../../components/NavBar';
import Footer from '../../../components/Footer';

const FullWidthLayout = ({ children, className }) => (
  <div className={className}>
    <NavBar />
    {children}
    <Footer />
  </div>
);

export default FullWidthLayout;
