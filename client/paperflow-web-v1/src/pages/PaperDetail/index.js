import React, { useEffect, useState } from 'react';
import {
  Button,
} from 'react-bootstrap';
import axios from 'axios';
import * as Icon from 'react-bootstrap-icons';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';
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

  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;

  const { id: paperId } = parseQueryString();

  const [paperTitle, setPaperTitle] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [paperPublisher, setPaperPublisher] = useState('');
  const [paperPublishedConference, setPaperPublishedConference] = useState('');
  const [authors, setAuthors] = useState('');
  const [paperDOI, setPaperDOI] = useState('');
  const [citations, setCitations] = useState(null);
  const [references, setReferences] = useState(null);
  const [abstract, setAbstract] = useState('');
  const [paperTopics, setPaperTopics] = useState(null);
  const [pdfUrls, setPdfUrls] = useState(null);

  const fetchPaper = async (id) => {
    const { data } = await axios.get(`${config.backendEndPoint}/backend/paper`, {
      params: { paperId: id },
    });

    if (data.error) {
      return null;
    }

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
      journal_volume: journalVolume,
      journal_pages: journalPages,
      doi,
      mag_id: magId,
    } = data.paper;

    return {
      id,
      title,
      abstract,
      pdfUrls,
      authors,
      citationList,
      referenceList,
      fieldList,
      publicationYear,
      venue,
      journalName,
      journalVolume,
      journalPages,
      doi,
      magId,
    };
  };

  const retrievePaperInfo = async () => {
    try {
      const {
        title,
        abstract,
        pdfUrls,
        authors,
        citationList,
        referenceList,
        fieldList,
        publicationYear,
        venue,
        journalName,
        doi,
      } = await fetchPaper(paperId);

      setPaperTitle(title);
      setPublishDate(publicationYear);
      setPaperPublisher(venue);
      setPaperPublishedConference(journalName);
      setAuthors(JSON.parse(authors).map((item) => item.name));
      setPaperDOI(doi);
      setCitations(await Promise.all(
        JSON.parse(citationList).map((citPaperId) => fetchPaper(citPaperId)),
      ));
      setReferences(await Promise.all(
        JSON.parse(referenceList).map((refPaperId) => fetchPaper(refPaperId)),
      ));
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
          <span className={styles.number}>{citations ? citations.length : 0}</span>
          <span className={styles.content}>Citations</span>
        </div>
        <div className={styles.infoWithIcon}>
          <span className={styles.icon}><Icon.People /></span>
          <span className={styles.number}>{references ? references.length : 0}</span>
          <span className={styles.content}>References</span>
        </div>

        <div className={styles.abstract}>
          <b>Abstract:</b><br />
          {abstract}
        </div>

        <div className={styles.topicSection}>
          <h3>Paper Topics</h3>
          {paperTopics && paperTopics.map((item) => (
            <KeywordBadge key={`currentPaperTopic_${item.keyword}`} keyword={item.keyword} highlight={item.highlight} />
          ))}
        </div>

        <div className={styles.topicSection}>
          <h3>PDFs</h3>
          <ul>
            {pdfUrls && pdfUrls.map((url) => (
              <li key={url}>
                <Button variant="link" className={styles.paperTitle} href={url} target="_blank">{url}</Button>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.relatedPapersSection}>
          <h3>References</h3>
          {
            references && references.filter((reference) => reference).map((reference) => (
              <PaperListItem
                key={reference.id}
                title={reference.title}
                date={reference.publicationYear}
                authors={JSON.parse(reference.authors).map((item) => item.name)}
                abstract={reference.abstract}
                highlightKeywords={JSON.parse(reference.fieldList).filter((item) => item === 'Computer Science')}
                keywords={JSON.parse(reference.fieldList).filter((item) => item !== 'Computer Science')}
              />
            ))
          }
          <h3>Citations</h3>
          {
            citations && citations.filter((citation) => citation).map((citation) => (
              <PaperListItem
                key={citation.id}
                title={citation.title}
                date={citation.publicationYear}
                authors={JSON.parse(citation.authors).map((item) => item.name)}
                abstract={citation.abstract}
                highlightKeywords={JSON.parse(citation.fieldList).filter((item) => item === 'Computer Science')}
                keywords={JSON.parse(citation.fieldList).filter((item) => item !== 'Computer Science')}
              />
            ))
          }
        </div>
      </div>

    </DefaultLayout>
  );
};

export default PaperDetail;
