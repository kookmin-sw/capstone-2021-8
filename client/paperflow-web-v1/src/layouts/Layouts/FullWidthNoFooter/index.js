import React from 'react';
import NavBar from '../../../components/NavBar';
import stylesDefault from './Default.module.scss';
import './DefaultStyles.css';

const FullWidthNoFooterLayout = ({ children, className }) => {
  const styles = stylesDefault;

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <NavBar />
      {children}
    </div>
  );
};

export default FullWidthNoFooterLayout;
