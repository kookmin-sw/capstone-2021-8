import React from 'react';
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

  return (
    <DefaultLayout>
      <div className={styles.container}>
        <h3 className={styles.paperTitle}>
          <Icon.JournalText />&nbsp;
          Dynamically Updatable Ternary Segmented Aging Bloom
          Filter for OpenFlow-Compliant Low-Power Packet Processing
        </h3>
        <p className={styles.basicInfo}>
          2018
          <br />
          Publisher: IEEE
          <br />
          Published in: IEEE/ACM Transactions on Networking
          <br />
          Authors: Sheng-Chun Kao, Ding-Yuan Lee, An-Yeu Wu
          <br />
          DOI: 10.1109/TNET.2018.2813425
        </p>
        <div className={styles.infoWithIcon}>
          <span className={styles.icon}><Icon.BlockquoteLeft /></span>
          <span className={styles.number}>8</span>
          <span className={styles.content}>Citations</span>
        </div>
        <div className={styles.infoWithIcon}>
          <span className={styles.icon}><Icon.People /></span>
          <span className={styles.number}>35</span>
          <span className={styles.content}>References</span>
        </div>

        <div className={styles.abstract}>
          <b>Abstract:</b><br />
          OpenFlow, the main protocol for software-defined networking,
          requires large-sized rule tables and frequent updating.
          For fast packet processing, rule tables are often
          implemented with ternary content-addressable memory (TCAM)
          in the OpenFlow. To deal with TCAM power problems, many
          network applications employ bloom filters (BFs) to reduce
          the redundant operations of table-lookup and for low power
          consumption. However, applying traditional BFs to an OpenFlow
          switch leads to problems, such as unsupported dynamic update,
          large space overhead, and the rule-set expansion of ternary data.
          In this paper, we propose a dynamically updatable ternary segmented
          aging bloom filter (TSA-BF). The TSA-BF consists of two parts:
          a segmented aging BF algorithm (SA-BF) and a ternary prefix-tagging
          encoder (TPE). First, in the SA-BF, we develop an automatic update
          scheme using the mechanisms of content-aging and buffer-segmenting.
          The SA-BF ages and deletes its contents automatically,
          thus eliminating the costly communication overhead and
          enabling dynamic updating. It also achieves space efficiency
          by the developed partial-deletion mechanism. Second,
          in the TPE, we encode ternary prefix-rules into uniquely
          decodable binary code words. The TPE prevents the rule-set
          expansion of ternary-data in the OpenFlow environment.
          Simulation results show that the SA-BF alone can save 37%
          of space overhead, compared with state-of-the-art techniques.
          In an environment with the ternary prefix-rules, the TSA-BF
          can save another 93% of space overhead, compared with the
          best-performance scheme. Hence, the proposed TSA-BF is highly
          suited to the requirements of emerging high-performance
          TCAM-based packet processing in the OpenFlow, which considers
          dynamic update and power efficiency.
        </div>

        <div className={styles.topicSection}>
          <h3>Paper Topics</h3>
          <KeywordBadge keyword="OpenFlow" />
          <KeywordBadge keyword="Bloom Filter" highlight />
          <KeywordBadge keyword="Packet Processing" />
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
