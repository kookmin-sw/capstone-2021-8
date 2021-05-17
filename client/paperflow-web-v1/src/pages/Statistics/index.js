import React, { useState, useEffect } from 'react';
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

import stylesDesktopDefault from './DesktopDefault.module.scss';

const Statictics = () => {
  const {
    changeAlertModalContent,
  } = useRootData(({ appStore }) => ({
    changeAlertModalContent: appStore.changeAlertModalContent,
  }));

  const styles = stylesDesktopDefault;

  const [range, setRange] = useState({
    year: '21',
    month: '03',
  });

  const [statisticsData, setStatisticsData] = useState([]);

  const months = Array.from({ length: 12 }, (_, i) => (`0${String(i + 1)}`).slice(-2));
  const years = ['2017', '2018', '2019', '2020', '2021'];

  const handleSelect = (e) => {
    if (e.target.name === 'year' && e.target.value === '21' && Number(range.month) > 3) {
      changeAlertModalContent('잘못된 범위를 선택했습니다.');
    } else if (e.target.name === 'month' && Number(e.target.value) > 3 && range.year === '21') {
      changeAlertModalContent('잘못된 범위를 선택했습니다.');
    } else {
      setRange({ ...range, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    setStatisticsData(require(`../../assets/strings/Statistics/Data/${range.year}${range.month}.json`));
  }, [range]);

  const getColor = (data, color) => {
    const colorBase = COLORS[color];
    return data.map((d, idx) => ({ ...d, color: `${colorBase + (90 - (40 / data.length) * idx)}%)` }));
  };

  return (
    <DefaultDesktopLayout>
      <AlertModal />
      <div className={styles.container}>
        <div className={styles.filter}>
          <div className={styles.filterTitle}>
            Year :
          </div>
          <select
            name="year"
            onChange={handleSelect}
            className={styles.filterBox}
            value={range.year}
          >
            {years.map((y) => (
              <option value={y.slice(-2)} key={y}>{y}</option>
            ))}
          </select>
        </div>
        <div className={styles.filter}>
          <div className={styles.filterTitle}>
            Month :
          </div>
          <select
            name="month"
            onChange={handleSelect}
            className={styles.filterBox}
            value={range.month}
          >
            {months.map((m) => (
              <option value={m} key={m}>{m}</option>
            ))}
          </select>
        </div>
        <div className={styles.titleContainer}>
          {range.year}년 {range.month}월 통계
        </div>
        <br />
        <hr />
        <br />
        <div className={styles.statisticsContainer}>
          { statisticsData.map((data) => {
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
                      <span key={paper.title} className={styles.paperIndex}>
                        {idx + 1}.
                      </span>
                      <span key={paper.title} className={styles.paperTitle}>
                        {paper.title}
                      </span>
                      <span key={paper.title} className={styles.paperCitationTitle}>
                        citation:
                      </span>
                      <span key={paper.title} className={styles.paperCitation}>
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
