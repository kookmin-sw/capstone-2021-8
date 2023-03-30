import React from 'react';
import NavBar from '../../../components/NavBar';
import stylesDefault from './Default.module.scss';
import './DefaultStyles.css';

import AlertModal from '../../../components/AlertModal';

const FullWidthNoFooterLayout = ({ children, className }) => {
  const styles = stylesDefault;

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <AlertModal />
      <NavBar />
      {children}
    </div>
  );
};

export default FullWidthNoFooterLayout;
