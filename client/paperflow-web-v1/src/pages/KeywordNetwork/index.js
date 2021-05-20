import React, { useEffect, useState, useRef } from 'react';
import { select, zoom } from 'd3';
import { Jumbotron } from 'react-bootstrap';
import AlertModal from '../../components/AlertModal';
import useRootData from '../../hooks/useRootData';
import Network from '../../components/Network';
import Tooltip from '../../components/Network/Tooltip';
import FullWidthNoFooterLayout from '../../layouts/Layouts/FullWidthNoFooter';
import {
  nodeStandard, linkStandard, months, years,
} from '../../assets/strings/Network/config';
import statistics from '../../assets/strings/Network/statistics.json';
import stylesDesktopDefault from './DesktopDefault.module.scss';

const KeywordNetwork = () => {
  const {
    changeAlertModalContent,
  } = useRootData(({ appStore }) => ({
    changeAlertModalContent: appStore.changeAlertModalContent,
  }));

  const styles = stylesDesktopDefault;

  const svgRef = useRef();
  const tooltipRef = useRef();

  const [range, setRange] = useState({
    year: '21',
    month: '03',
  });

  // tooltip functions
  const handleTooltipInfo = (next) => {
    const tooltip = select(tooltipRef.current);
    tooltip.select('div').text(next.id);
    if (next.visible) {
      tooltip
        .style('display', null)
        .style('transform', `translate(${next.x + 30}px,${next.y - 30}px)`);
    } else {
      tooltip.style('display', 'none');
    }
  };

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
    const timer = setTimeout(() => {
      const parentDiv = select(svgRef.current);

      if (parentDiv.node() !== null) {
        if (parentDiv.node().querySelector('g') !== null) {
          // initial setting
          parentDiv.select('g')
            .attr('transform', 'translate(0,0) scale(1)');

          // zoom and drag
          const container = zoom()
            .on('zoom', (d) => {
              parentDiv.select('g').attr('transform', `translate(${[d.transform.x, d.transform.y]}) scale(${d.transform.k})`);
            });
          select(svgRef.current).call(container);
        }
      }
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  const setNetwork = (data) => {
    const nodes = data.node.map((nodeList, idx) => (nodeList.map((node) => ({
      id: node,
      depth: idx,
      radius: nodeStandard[idx].radius,
      color: nodeStandard[idx].color,
    }))));
    const links = data.link.map((link) => ({
      source: link.source,
      target: link.target,
      distance: linkStandard[link.depth[0]][link.depth[1]],
    }));
    return {
      nodes: nodes.flat(),
      links,
    };
  };

  return (
    <FullWidthNoFooterLayout>
      <AlertModal />
      <div className={styles.filterContainer}>
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
      </div>
      <Jumbotron id={styles.networkContainer}>
        <div
          className={styles.network}
          ref={svgRef}
        >
          <Network
            data={setNetwork(statistics[range.year + range.month])}
            handleTooltipInfo={handleTooltipInfo}
          />
          <Tooltip tooltipRef={tooltipRef} />
        </div>
      </Jumbotron>
    </FullWidthNoFooterLayout>
  );
};

export default KeywordNetwork;
