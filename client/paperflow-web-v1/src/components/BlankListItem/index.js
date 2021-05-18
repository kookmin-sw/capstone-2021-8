import React from 'react';
import {
  Card,
} from 'react-bootstrap';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';

const BlankListItem = ({
  content,
}) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;

  return (
    <Card className={styles.paperListItem}>
      <Card.Body className={`text-muted ${styles.paperListItemBody}`}>
        {content}
      </Card.Body>
    </Card>
  );
};

export default BlankListItem;
