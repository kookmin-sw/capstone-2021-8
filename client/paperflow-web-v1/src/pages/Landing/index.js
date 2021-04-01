import React from 'react';
import {
  Carousel,
} from 'react-bootstrap';

import backgroundImage from '../../assets/images/concept-1868728_1920.jpg';
import stylesDesktopDefault from './DesktopDefault.module.scss';

const App = ({ screenClass }) => {
  const isDesktop = screenClass === 'xl';
  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            className={styles.carouselImage}
            src={backgroundImage}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className={styles.carouselImage}
            src={backgroundImage}
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className={styles.carouselImage}
            src={backgroundImage}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      Landing Page<br />hello, world!
    </div>
  );
};

export default App;
