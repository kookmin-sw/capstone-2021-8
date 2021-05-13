import React from 'react';
import {
  Jumbotron,
  Container,
  Carousel,
} from 'react-bootstrap';
import useRootData from '../../hooks/useRootData';
import backgroundImage from '../../assets/images/books-1245690_1920.jpg';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';
import FullWidthLayout from '../../layouts/Layouts/FullWidth';
import AchvCounter from '../../components/AchvCounter';
import IntroCard from '../../components/IntroCard';
import { achvs, features } from '../../assets/strings/Landing';

const Lading = () => {
  const { screenClass, changeMainMenu } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),

    changeMainMenu: appStore.changeMainMenu,
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;

  return (
    <FullWidthLayout>
      <Carousel controls={false}>
        <Carousel.Item>
          <img
            className={`d-block ${styles.carouselImage}`}
            src={backgroundImage}
            alt="First slide"
          />
          <Carousel.Caption className={styles.carouselCaption}>
            <div className={styles.mainPhrase}>
              Discover flow of papers with PaperFlow
            </div>
            <div className={styles.submainPhrase}>
              PaperFlow helps you to catch up recent research flow
              by gives you &ldquo;paper flow diagram&rdquo;
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Jumbotron fluid>
        <Container>
          <h1>
            지금 바로 논문을 검색해 보세요!
          </h1>
          <p>
            생소한 분야의 논문이더라도, 흐름을 쉽게 파악할 수 있습니다!
          </p>
          <input
            type="text"
            className="form-control"
            placeholder="논문 이름으로 검색"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                changeMainMenu(`/search?search=${e.target.value}`);
              }
            }}
          />
        </Container>
      </Jumbotron>

      <AchvCounter achvs={achvs} />

      {
        features.map((item) => {
          const { image, title, content } = item;
          return <IntroCard key={title} image={image} title={title} content={content} />;
        })
      }

    </FullWidthLayout>
  );
};

export default Lading;
