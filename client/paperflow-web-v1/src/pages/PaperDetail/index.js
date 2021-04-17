import React, { useEffect, useState } from 'react';
import {
} from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import KeywordBadge from '../../components/KeywordBadge';
import PaperListItem from '../../components/PaperListItem';
import DefaultLayout from '../../layouts/Layouts/Default';

const PaperDetail = () => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  // eslint-disable-next-line no-unused-vars
  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

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

  useEffect(() => {
    setPaperTitle('Dynamically Updatable Ternary Segmented Aging Bloom Filter for OpenFlow-Compliant Low-Power Packet Processing');
    setPublishDate('2018');
    setPaperPublisher('IEEE');
    setPaperPublishedConference('IEEE/ACM Transactions on Networking');
    setAuthors('Sheng-Chun Kao, Ding-Yuan Lee, An-Yeu Wu');
    setPaperDOI('10.1109/TNET.2018.2813425');
    setCitations('8');
    setReferences('35');
    setAbstract('OpenFlow, the main protocol for software-defined networking, requires large-sized rule tables and frequent updating. For fast packet processing, rule tables are often implemented with ternary content-addressable memory (TCAM) in the OpenFlow. To deal with TCAM power problems, many network applications employ bloom filters (BFs) to reduce the redundant operations of table-lookup and for low power consumption. However, applying traditional BFs to an OpenFlow switch leads to problems, such as unsupported dynamic update, large space overhead, and the rule-set expansion of ternary data. In this paper, we propose a dynamically updatable ternary segmented aging bloom filter (TSA-BF). The TSA-BF consists of two parts: a segmented aging BF algorithm (SA-BF) and a ternary prefix-tagging encoder (TPE). First, in the SA-BF, we develop an automatic update scheme using the mechanisms of content-aging and buffer-segmenting. The SA-BF ages and deletes its contents automatically, thus eliminating the costly communication overhead and enabling dynamic updating. It also achieves space efficiency by the developed partial-deletion mechanism. Second, in the TPE, we encode ternary prefix-rules into uniquely decodable binary code words. The TPE prevents the rule-set expansion of ternary-data in the OpenFlow environment. Simulation results show that the SA-BF alone can save 37% of space overhead, compared with state-of-the-art techniques. In an environment with the ternary prefix-rules, the TSA-BF can save another 93% of space overhead, compared with the best-performance scheme. Hence, the proposed TSA-BF is highly suited to the requirements of emerging high-performance TCAM-based packet processing in the OpenFlow, which considers dynamic update and power efficiency.');
    setPaperTopics([
      {
        keyword: 'OpenFlow',
        highlight: false,
      },
      {
        keyword: 'Bloom Filter',
        highlight: true,
      },
      {
        keyword: 'Packet Processing',
        highlight: false,
      },
    ]);
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
            <KeywordBadge key={item} keyword={item.keyword} highlight={item.highlight} />
          ))}
        </div>

        <div className={styles.relatedPapersSection}>
          <h3>Related Papers</h3>
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
