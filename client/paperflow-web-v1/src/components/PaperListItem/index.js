/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Button,
  Card,
} from 'react-bootstrap';
import useRootData from '../../hooks/useRootData';
import KeywordBadge from '../KeywordBadge';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';

const PaperListItem = ({
  paperId, title, date, authors, abstract, highlightKeywords, keywords, abstractMaxLength = 300,
}) => {
  const { screenClass, changeMainMenu } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
    changeMainMenu: appStore.changeMainMenu,
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;

  return (
    <Card className={styles.paperListItem}>
      <Card.Body>
        <Button variant="link" className={styles.paperTitle} onClick={() => changeMainMenu(`/paper-detail?id=${paperId}`)}>{title}</Button>
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
            highlightKeywords && highlightKeywords.map((item) => (
              <KeywordBadge key={item} keyword={item} highlight />
            ))
          }
          {
            keywords && keywords.map((item) => (
              <KeywordBadge key={item} keyword={item} />
            ))
          }
        </div>
      </Card.Body>
    </Card>
  );
};

export default PaperListItem;
