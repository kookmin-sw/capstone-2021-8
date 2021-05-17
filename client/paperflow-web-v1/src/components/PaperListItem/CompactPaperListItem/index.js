import React from 'react';
import {
  Button,
  Card,
} from 'react-bootstrap';
import useRootData from '../../../hooks/useRootData';
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
      <Card.Body className={styles.paperListItemBody}>
        <Button variant="link" className={styles.paperTitle} onClick={() => changeMainMenu(`/paper-detail?id=${paperId}`)}>{title}</Button>
        <div className={styles.basicInfo}>
          <span className={styles.publishDate}>{date}</span>
          <span className={styles.authors}>&nbsp;by&nbsp;
            {(authors.length > 3 ? [...authors.slice(0, 3), 'et al.'] : authors).join(', ')}
          </span>
        </div>
        <div className={styles.keywordContainer}>
          <ul>
            {
              highlightKeywords && highlightKeywords.map((item) => (
                <li key={item} className={styles.highlight}>{item}</li>
              ))
            }
            {
              keywords && keywords.map((item) => (
                <li key={item}>{item}</li>
              ))
            }
          </ul>
        </div>
        <p className={styles.abstract}>
          {abstract.length > abstractMaxLength ? `${abstract.slice(0, abstractMaxLength)} ...` : abstract}
        </p>
      </Card.Body>
    </Card>
  );
};

export default PaperListItem;
