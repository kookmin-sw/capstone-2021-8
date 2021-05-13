import React, { useEffect, useState } from 'react';
import {
  Button,
} from 'react-bootstrap';
import axios from 'axios';
import * as Icon from 'react-bootstrap-icons';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import KeywordBadge from '../../components/KeywordBadge';
import PaperListItem from '../../components/PaperListItem';
import DefaultLayout from '../../layouts/Layouts/Default';
import {
  parseQueryString,
} from '../../utils/utility';
import config from '../../config';

const PaperDetail = () => {
  const { screenClass, changeAlertModalContent } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),

    changeAlertModalContent: appStore.changeAlertModalContent,
  }));
  const isDesktop = screenClass === 'xl';

  // eslint-disable-next-line no-unused-vars
  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  const { id: paperId } = parseQueryString();

  const [paperTitle, setPaperTitle] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [paperPublisher, setPaperPublisher] = useState('');
  const [paperPublishedConference, setPaperPublishedConference] = useState('');
  const [authors, setAuthors] = useState('');
  const [paperDOI, setPaperDOI] = useState('');
  const [citations, setCitations] = useState('');
  const [references, setReferences] = useState('');
  const [abstract, setAbstract] = useState('');
  const [paperTopics, setPaperTopics] = useState(null);
  const [pdfUrls, setPdfUrls] = useState(null);

  const retrievePaperInfo = async () => {
    try {
      const { data: { paper } } = await axios.get(`${config.backendEndPoint}/backend/paper`, {
        params: { paperId },
      });

      const {
        title,
        abstract,
        pdf_urls: pdfUrls,
        authors,
        citation_list: citationList,
        reference_list: referenceList,
        field_list: fieldList,
        publication_year: publicationYear,
        venue,
        journal_name: journalName,
        // eslint-disable-next-line no-unused-vars
        journal_volume: journalVolume,
        // eslint-disable-next-line no-unused-vars
        journal_pages: journalPages,
        doi,
        // eslint-disable-next-line no-unused-vars
        mag_id: magId,
      } = paper;

      setPaperTitle(title);
      setPublishDate(publicationYear);
      setPaperPublisher(venue);
      setPaperPublishedConference(journalName);
      setAuthors(JSON.parse(authors).map((item) => item.name));
      setPaperDOI(doi);
      setCitations(JSON.parse(citationList).length);
      setReferences(JSON.parse(referenceList).length);
      setAbstract(abstract);
      setPaperTopics(JSON.parse(fieldList).map((item) => ({
        keyword: item,
        highlight: item === 'Computer Science',
      })));
      setPdfUrls(JSON.parse(pdfUrls));
    } catch (err) {
      changeAlertModalContent(`뭔가 잘못되었습니다. ${err}`);
    }
  };

  useEffect(() => {
    retrievePaperInfo();
  }, []);

  return (
    <DefaultLayout>
      <div className={styles.container}>
        <h3 className={styles.paperTitle}>
          <Icon.JournalText />&nbsp;
          {paperTitle}
        </h3>
        <p className={styles.basicInfo}>
          {publishDate}
          <br />
          Publisher: {paperPublisher}
          <br />
          Published in: {paperPublishedConference}
          <br />
          Authors: {authors}
          <br />
          DOI: {paperDOI}
        </p>
        <div className={styles.infoWithIcon}>
          <span className={styles.icon}><Icon.BlockquoteLeft /></span>
          <span className={styles.number}>{citations}</span>
          <span className={styles.content}>Citations</span>
        </div>
        <div className={styles.infoWithIcon}>
          <span className={styles.icon}><Icon.People /></span>
          <span className={styles.number}>{references}</span>
          <span className={styles.content}>References</span>
        </div>

        <div className={styles.abstract}>
          <b>Abstract:</b><br />
          {abstract}
        </div>

        <div className={styles.topicSection}>
          <h3>Paper Topics</h3>
          {paperTopics && paperTopics.map((item) => (
            <KeywordBadge key={item.keyword} keyword={item.keyword} highlight={item.highlight} />
          ))}
        </div>

        <div className={styles.topicSection}>
          <h3>PDFs</h3>
          <ul>
            {pdfUrls && pdfUrls.map((url) => (
              <li>
                <Button key={url} variant="link" className={styles.paperTitle} href={url} target="_blank">{url}</Button>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.relatedPapersSection}>
          <h3>Related Papers</h3>
          {/* Todo: 추천 기능 적용 후 useState 적용 */}
          <PaperListItem
            title="Scaling of Magnetic Dissipation and Particle Acceleration in ABC Fields"
            date="Nov 2021"
            authors={['Qiang Chen', 'Krzysztof Nalewajko', 'Bhupendra Mishra']}
            abstract="Automatic abstractive summaries are found to often distort or fabricate facts in the
          article. This inconsistency between summary and original text has seriously"
            highlightKeywords={['Math.AC']}
            keywords={['Math.RA']}
          />
        </div>
      </div>

    </DefaultLayout>
  );
};

export default PaperDetail;
