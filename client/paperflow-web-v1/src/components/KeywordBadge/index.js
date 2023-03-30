/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Card,
} from 'react-bootstrap';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
// import stylesMobileDefault from './MobileDefault.module.scss';

const KeywordBadge = ({
  keyword, highlight = false,
}) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  return (
    highlight
      ? (
        <div className={styles.highlightKeyword}>
          {keyword}
        </div>
      )
      : (
        <div className={styles.keyword}>
          {keyword}
        </div>
      )
  );
};

export default KeywordBadge;
