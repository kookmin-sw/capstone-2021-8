import React from 'react';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';
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
              <CountUp start={0} separator="," end={item.number}>
                {({ countUpRef, start }) => (
                  <VisibilitySensor onChange={start} delayedCall>
                    <h2 className={styles.number} ref={countUpRef}>{' '}</h2>
                  </VisibilitySensor>
                )}
              </CountUp>
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
              <CountUp start={0} separator="," end={item.number}>
                {({ countUpRef, start }) => (
                  <VisibilitySensor onChange={start} delayedCall>
                    <h2 className={styles.number} ref={countUpRef}>{' '}</h2>
                  </VisibilitySensor>
                )}
              </CountUp>
              <span className={styles.description}>{item.description}</span>
            </Col>
          </Row>
        ))
      }
    </Container>
  );
};

export default AchvCounter;
