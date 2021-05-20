import React, { useState } from 'react';
import {
  DropdownButton, Dropdown, Form,
} from 'react-bootstrap';
import AlertModal from '../../components/AlertModal';
import DefaultDesktopLayout from '../../layouts/Layouts/DefaultDesktop';
import useRootData from '../../hooks/useRootData';
import Pie from '../../components/Statistics/Pie';
import Circle from '../../components/Statistics/Circle';
import VertBar1D from '../../components/Statistics/VertBar1D';
import HorizBar1D from '../../components/Statistics/HorizBar1D';
import VertBar2D from '../../components/Statistics/VertBar2D';
import HorizBar2D from '../../components/Statistics/HorizBar2D';
import { COLORS } from '../../assets/strings/Statistics/config';
import statistics from '../../assets/strings/Statistics/statistics.json';
import stylesDesktopDefault from './DesktopDefault.module.scss';

const Statictics = () => {
  const {
    changeAlertModalContent,
  } = useRootData(({ appStore }) => ({
    changeAlertModalContent: appStore.changeAlertModalContent,
  }));

  const styles = stylesDesktopDefault;

  const [range, setRange] = useState({
    year: '2021',
    month: '03',
  });

  const months = Array.from({ length: 12 }, (_, i) => (`0${String(i + 1)}`).slice(-2));
  const years = ['2017', '2018', '2019', '2020', '2021'];

  const handleSelect = (e) => {
    const value = e.target.innerHTML;
    if (e.target.name === 'year' && value === '2021' && Number(range.month) > 3) {
      changeAlertModalContent('잘못된 범위를 선택했습니다.');
    } else if (e.target.name === 'month' && Number(value) > 3 && range.year === '2021') {
      changeAlertModalContent('잘못된 범위를 선택했습니다.');
    } else {
      setRange({ ...range, [e.target.name]: value });
    }
  };

  const getColor = (data, color) => {
    const colorBase = COLORS[color];
    return data.map((d, idx) => ({ ...d, color: `${colorBase + (90 - (40 / data.length) * idx)}%)` }));
  };

  return (
    <DefaultDesktopLayout>
      <AlertModal />
      <div className={styles.container}>
        <div className={styles.filter}>
          <Form.Label className={`${styles.filterTitle} align-center`}>년도</Form.Label>
          <DropdownButton
            className={styles.filterBox}
            variant="outline-primary"
            title={range.year}
          >
            {years.map((y) => (
              <Dropdown.Item key={y} name="year" onClick={handleSelect}>{y}</Dropdown.Item>
            ))}
          </DropdownButton>
          <Form.Label className={styles.filterTitle}>월</Form.Label>
          <DropdownButton
            className={styles.filterBox}
            variant="outline-primary"
            title={range.month}
          >
            {months.map((m) => (
              <Dropdown.Item key={m} name="month" onClick={handleSelect}>{m}</Dropdown.Item>
            ))}
          </DropdownButton>
        </div>
        <div className={styles.titleContainer}>
          {range.year}년 {range.month}월 통계
        </div>
        <br />
        <hr />
        <br />
        <div className={styles.statisticsContainer}>
          { statistics[range.year.slice(-2) + range.month].map((data) => {
            if (data.type === 'Pie') {
              return (
                <div key={data.title} className={styles.graphContainer}>
                  <div key={data.title} className={styles.graphTextContainer}>
                    {data.title}
                  </div>
                  <Pie data={data.data} />
                </div>
              );
            }
            if (data.type === 'Circle') {
              return (
                <div key={data.title} className={styles.graphContainer}>
                  <div key={data.title} className={styles.graphTextContainer}>
                    {data.title}
                  </div>
                  <Circle data={data.data} />
                </div>
              );
            }
            if (data.type === 'VertBar1D') {
              return (
                <div key={data.title} className={styles.graphContainer}>
                  <div key={data.title} className={styles.graphTextContainer}>
                    {data.title}
                  </div>
                  <VertBar1D
                    data={getColor(data.data, data.config.color)}
                    config={data.config}
                  />
                </div>
              );
            }
            if (data.type === 'HorizBar1D') {
              return (
                <div key={data.title} className={styles.graphContainer}>
                  <div key={data.title} className={styles.graphTextContainer}>
                    {data.title}
                  </div>
                  <HorizBar1D
                    data={getColor(data.data, data.config.color)}
                    config={data.config}
                  />
                </div>
              );
            }
            if (data.type === 'VertBar2D') {
              return (
                <div key={data.title} className={styles.graphContainer}>
                  <div key={data.title} className={styles.graphTextContainer}>
                    {data.title}
                  </div>
                  <VertBar2D data={data.data} config={data.config} />
                </div>
              );
            }
            if (data.type === 'HorizBar2D') {
              return (
                <div key={data.title} className={styles.graphContainer}>
                  <div key={data.title} className={styles.graphTextContainer}>
                    {data.title}
                  </div>
                  <HorizBar2D data={data.data} config={data.config} />
                </div>
              );
            }
            if (data.type === 'Paper') {
              return (
                <div key={data.title} className={styles.paperContainer}>
                  <div key={data.title} className={styles.paperContainerTitle}>
                    {data.title}
                  </div>
                  {data.data.map((paper, idx) => (
                    <div key={paper.title}>
                      <span className={styles.paperIndex}>
                        {idx + 1}.
                      </span>
                      <span className={styles.paperTitle}>
                        {paper.title}
                      </span>
                      <span className={styles.paperCitationTitle}>
                        citation:
                      </span>
                      <span className={styles.paperCitation}>
                        {paper.citation}
                      </span>
                    </div>
                  ))}
                  <hr />
                </div>
              );
            }
            return (
              <div />
            );
          })}
        </div>
      </div>
    </DefaultDesktopLayout>
  );
};

export default Statictics;
