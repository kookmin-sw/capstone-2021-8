import React from 'react';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';

import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';

const AchvCounter = ({ screenClass }) => {
  const isDesktop = screenClass === 'xl';
  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;

  return (
    <Container className="w-100">
      <Row>
        <Col className={styles.achvItemCol}>1 of 3</Col>
        <Col className={styles.achvItemCol}>2 of 3</Col>
        <Col className={styles.achvItemCol}>3 of 3</Col>
      </Row>
    </Container>
  );
};

export default AchvCounter;
