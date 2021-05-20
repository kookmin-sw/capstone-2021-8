import React from 'react';
import NavBar from '../../../components/NavBar';

const FullWidthNoFooterLayout = ({ children, className }) => (
  <div className={className}>
    <NavBar />
    {children}
  </div>
);

export default FullWidthNoFooterLayout;
