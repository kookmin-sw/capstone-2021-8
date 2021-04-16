/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Card,
} from 'react-bootstrap';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
// import stylesMobileDefault from './MobileDefault.module.scss';

const PaperListItem = ({
  title, date, authors, abstract, heightKeywords, keywords, abstractMaxLength = 300,
}) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  return (
    <Card className={styles.paperListItem}>
      <Card.Body>
        <div className={styles.paperTitle}>
          {title}
        </div>
        <div className={styles.basicInfo}>
          <span className={styles.publishDate}>{date}</span>
          <span className={styles.authors}>&nbsp;by&nbsp;
            {(authors.length > 3 ? [...authors.slice(0, 3), 'et al.'] : authors).join(', ')}
          </span>
        </div>
        <p className={styles.abstract}>
          {abstract.length > abstractMaxLength ? `${abstract.slice(0, abstractMaxLength)} ...` : abstract}
        </p>
        <div className={styles.keywordContainer}>
          {
            heightKeywords && heightKeywords.map((item) => (
              <div key={item} className={styles.heightKeyword}>
                {item}
              </div>
            ))
          }
          {
            keywords && keywords.map((item) => (
              <div key={item} className={styles.keyword}>
                {item}
              </div>
            ))
          }
        </div>
      </Card.Body>
    </Card>
  );
};

export default PaperListItem;
