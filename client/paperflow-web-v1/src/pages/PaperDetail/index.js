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
import PaperList from '../../components/PaperList';
import TimeLine from '../../components/TimeLine';
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

  const [paperflowArray, setPaperflowArray] = useState(null);

  const fetchPaperFlow = async (id) => {
    const { data } = await axios.get(`${config.backendEndPoint}/backend/paper-flow`, {
      params: { paperId: id },
    });

    if (data.error) { return; }

    setPaperflowArray(data.paperflow);
  };

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
        journalVolume,
        journalPages,
        doi,
      } = await fetchPaper(paperId);

      fetchPaperFlow(paperId);

      setPaperTitle(title);
      setPublishDate(publicationYear);
      setPaperPublisher(venue);
      setPaperPublishedConference([journalName, journalVolume, journalPages].filter((str) => str).join(' • '));
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

        {pdfUrls && pdfUrls.map((url) => (
          <Button key={url} variant="primary" size="sm" href={url} target="_blank">
            {(new URL(url)).hostname}
            {' '}<Icon.BoxArrowInUpRight />
          </Button>
        ))}

        <div className={styles.infoWithIconSection}>
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

        <div className={styles.relatedPapersSection}>
          <h3>References</h3>
          <p>Computer Science 분야가 포함된 논문만 보여집니다.</p>
          {
            references
            && (
              <PaperList
                papers={references.filter((reference) => reference).map(({
                  id, title, publicationYear, authors, abstract, fieldList,
                }) => (
                  {
                    id,
                    title,
                    date: publicationYear,
                    authors: JSON.parse(authors).map((item) => item.name),
                    abstract,
                    highlightKeywords: JSON.parse(fieldList).filter((item) => item === 'Computer Science'),
                    keywords: JSON.parse(fieldList).filter((item) => item !== 'Computer Science'),
                  }
                ))}
              />
            )
          }
          <h3>Citations</h3>
          <p>Computer Science 분야가 포함된 논문만 보여집니다.</p>
          {
            citations && (
              <PaperList
                papers={citations.filter((citation) => citation).map(({
                  id, title, publicationYear, authors, abstract, fieldList,
                }) => (
                  {
                    id,
                    title,
                    date: publicationYear,
                    authors: JSON.parse(authors).map((item) => item.name),
                    abstract,
                    highlightKeywords: JSON.parse(fieldList).filter((item) => item === 'Computer Science'),
                    keywords: JSON.parse(fieldList).filter((item) => item !== 'Computer Science'),
                  }
                ))}
              />
            )
          }
          <h3>Paper Flow</h3>
          {paperflowArray && (
          <TimeLine timeLineElements={paperflowArray.map((paperflow) => ({
            date: paperflow.publication_year,
            content: (
              <PaperListItem
                paperId={paperflow.paper_id}
                title={paperflow.title}
                date={paperflow.publication_year}
                authors={JSON.parse(paperflow.authors).map((item) => item.name)}
                abstract={paperflow.abstract}
                highlightKeywords={JSON.parse(paperflow.field_list).filter((item) => item === 'Computer Science')}
                keywords={JSON.parse(paperflow.field_list).filter((item) => item !== 'Computer Science')}
                compact
              />
            ),
          }))}
          />
          )}
        </div>
      </div>

    </DefaultLayout>
  );
};

export default PaperDetail;
