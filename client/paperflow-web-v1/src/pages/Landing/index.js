import React from 'react';
import {
  Carousel,
} from 'react-bootstrap';

import backgroundImage from '../../assets/images/concept-1868728_1920.jpg';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import DefaultLayout from '../../layouts/Layouts/Default';
import AchvCounter from '../../components/AchvCounter';

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
      <AchvCounter />
    </DefaultLayout>
  );
};

export default App;
