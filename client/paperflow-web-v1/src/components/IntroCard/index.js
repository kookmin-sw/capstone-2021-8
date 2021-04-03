import React from 'react';
import {
  Container,
  Jumbotron,
} from 'react-bootstrap';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
// import stylesMobileDefault from './MobileDefault.module.scss';

const IntroCard = () => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  // Todo: 예제를 위한 mockup데이터 string으로 옮기기
  return (
    <Jumbotron fluid>
      <Container className={styles.introCardContainer}>
        <img
          className={styles.cardImage}
          src="https://cdn.pixabay.com/photo/2021/01/01/16/07/clouds-5879037_1280.jpg"
          alt=""
        />
        <div className={styles.contentText}>
          <h2>PaperFlow의 feature 1</h2>
          <p>
            PaperFlow의 feature 1이 들어갈 위치입니다.
          </p>
        </div>
      </Container>
    </Jumbotron>
  );
};

export default IntroCard;
