/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Card,
} from 'react-bootstrap';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
// import stylesMobileDefault from './MobileDefault.module.scss';

const PaperItemList = ({
  title, date, author, abstract,
}) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  return (
    <Card>
      <Card.Body>
        <h4>
          Scaling of Magnetic Dissipation and Particle Acceleration in ABC Fields
        </h4>
        <p>Nov 2021 by Qiang Chen, Krzysztof Nalewajko, Bhupendra Mishra</p>
        <p>
          Automatic abstractive summaries are found to often distort or fabricate facts in the
          article. This inconsistency between summary and original text has seriously…
        </p>
      </Card.Body>
    </Card>
  );
};

export default PaperItemList;
