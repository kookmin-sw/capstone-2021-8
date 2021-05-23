import React from 'react';
import {
  Container,
  Jumbotron,
} from 'react-bootstrap';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';

const IntroCard = ({ image, title, content }) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;

  return (
    <Jumbotron fluid>
      <Container className={styles.introCardContainer}>
        <img
          className={styles.cardImage}
          src={image}
          alt=""
        />
        <div className={styles.contentText}>
          <div className={styles.title}>{title}</div>
          <div className={styles.content}>
            {content}
          </div>
        </div>
      </Container>
    </Jumbotron>
  );
};

export default IntroCard;
