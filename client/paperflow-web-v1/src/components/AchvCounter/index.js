import React from 'react';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';

const AchvCounter = ({ achvs = [] }) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;

  return isDesktop ? (
    <Container className={styles.achvContainer}>
      <Row className={`align-items-center ${styles.achvItemRow}`}>
        {
          achvs.map((item) => (
            <Col key={item.description} className={styles.achvItemCol}>
              <h2 className={styles.number}>{item.number}</h2>
              <span className={styles.description}>{item.description}</span>
            </Col>
          ))
        }
      </Row>
    </Container>
  ) : (
    <Container className={styles.achvContainer}>
      {
        achvs.map((item) => (
          <Row className={`align-items-center ${styles.achvItemRow}`}>
            <Col key={item.description} className={styles.achvItemCol}>
              <h2 className={styles.number}>{item.number}</h2>
              <span className={styles.description}>{item.description}</span>
            </Col>
          </Row>
        ))
      }
    </Container>
  );
};

export default AchvCounter;
