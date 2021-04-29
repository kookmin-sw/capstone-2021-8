import React from 'react';
import NavBar from '../../../components/NavBar';

const FullWidthNoWidthLayout = ({ children, className }) => (
  <div className={className}>
    <NavBar />
    {children}
  </div>
);

export default FullWidthNoWidthLayout;
