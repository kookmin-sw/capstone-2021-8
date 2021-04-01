import React from 'react';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';

import stylesDesktopDefault from './DesktopDefault.module.scss';
// import stylesMobileDefault from './MobileDefault.module.scss';

const AchvCounter = ({ screenClass }) => {
  const isDesktop = screenClass === 'xl';
  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  return (
    <Container className={styles.achvContainer}>
      <Row className={`align-items-center ${styles.achvItemRow}`}>
        <Col className={styles.achvItemCol}><h2 className={styles.number}>32K</h2>
          <span className={styles.description}>Publications</span>
        </Col>
        <Col className={styles.achvItemCol}><h2 className={styles.number}>12K</h2>
          <span className={styles.description}>Connected papers</span>
        </Col>
        <Col className={styles.achvItemCol}><h2 className={styles.number}>5K</h2>
          <span className={styles.description}>Topics</span>
        </Col>
      </Row>
    </Container>
  );
};

export default AchvCounter;
