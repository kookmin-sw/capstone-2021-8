import React from 'react';
import {
  Jumbotron,
  Container,
  Carousel,
} from 'react-bootstrap';

import backgroundImage from '../../assets/images/concept-1868728_1920.jpg';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import DefaultLayout from '../../layouts/Layouts/Default';
import AchvCounter from '../../components/AchvCounter';
import IntroCard from '../../components/IntroCard';

const App = ({ screenClass }) => {
  const isDesktop = screenClass === 'xl';
  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  return (
    <DefaultLayout>
      <Carousel controls={false}>
        <Carousel.Item>
          <img
            className={`d-block ${styles.carouselImage}`}
            src={backgroundImage}
            alt="First slide"
          />
          <Carousel.Caption>
            <h1>Discover flow of papers with PaperFlow</h1>
            <p>PaperFlow helps you to catch up recent research flow
              by gives you &ldquo;paper flow diagram&rdquo;
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Jumbotron fluid>
        <Container>
          <h1>지금 바로 논문을 검색해 보세요!</h1>
          <p>
            생소한 분야의 논문이더라도, 흐름을 쉽게 파악할 수 있습니다!
          </p>
          <input
            type="text"
            className="form-control"
            placeholder="논문 이름으로 검색"
          />
        </Container>
      </Jumbotron>

      <AchvCounter />

      <IntroCard />
    </DefaultLayout>
  );
};

export default App;
