import React, { useState } from 'react';
import AlertModal from '../../components/AlertModal';
import DefaultDesktopLayout from '../../layouts/Layouts/DefaultDesktop';
import useRootData from '../../hooks/useRootData';
import Pie from '../../components/Statistics/Pie';
import Bar from '../../components/Statistics/Bar';
import pieTest from '../../components/Statistics/Pie/testData.json';
import barTest from '../../components/Statistics/Bar/testData.json';

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
        <div className={styles.statisticsContainer}>
          <div className={styles.pieContainer}>
            <Pie data={pieTest} />
          </div>
          <div className={styles.pieContainer}>
            <Bar data={barTest} />
          </div>
        </div>
      </div>
    </DefaultDesktopLayout>
  );
};

export default Statictics;
