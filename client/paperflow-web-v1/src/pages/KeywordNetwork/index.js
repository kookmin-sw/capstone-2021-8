import React, { useEffect, useState, useRef } from 'react';
import { select, zoom } from 'd3';
import { Jumbotron } from 'react-bootstrap';

import Network from '../../components/Network';
import Tooltip from '../../components/Network/Tooltip';
import FullWith from '../../layouts/Layouts/FullWidth';
import {
  nodeStandard, linkStandard, months, years,
} from '../../assets/strings/Network/config';

import stylesDesktopDefault from './DesktopDefault.module.scss';

const KeywordNetwork = () => {
  const styles = stylesDesktopDefault;

  const svgRef = useRef();
  const tooltipRef = useRef();

  const [networkData, setNetworkData] = useState({
    nodes: [],
    links: [],
  });

  // eslint-disable-next-line no-unused-vars
  const [range, setRange] = useState({
    year: '20',
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
    console.log(e);
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
    const testNodes = data.node.map((nodeList, idx) => (nodeList.map((node) => ({
      id: node,
      depth: idx,
      radius: nodeStandard[idx].radius,
      color: nodeStandard[idx].color,
    }))));
    const testLinks = data.link.map((link) => ({
      source: link.source,
      target: link.target,
      distance: linkStandard[link.depth[0]][link.depth[1]],
    }));
    setNetworkData({
      nodes: testNodes.flat(),
      links: testLinks,
    });
  };

  // Set network data
  useEffect(() => {
    console.log(range.year, range.month);
    // eslint-disable-next-line import/no-dynamic-require, global-require
    setNetwork(require(`../../assets/strings/Network/Data/${range.year}${range.month}.json`));
  }, [range]);

  return (
    <FullWith>
      <div className={styles.filterContainer}>
        <div className={styles.filter}>
          <div className={styles.filterTitle}>
            Year :
          </div>
          <select
            onChange={handleSelect}
            className={styles.filterBox}
          >
            <option value="">선택하세요</option>
            {years.map((y) => (
              <option value={y} key={y}>{y}</option>
            ))}
          </select>
        </div>
        <div className={styles.filter}>
          <div className={styles.filterTitle}>
            Month :
          </div>
          <select
            onChange={handleSelect}
            className={styles.filterBox}
          >
            <option value="">선택하세요</option>
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
            data={networkData}
            handleTooltipInfo={handleTooltipInfo}
          />
          <Tooltip tooltipRef={tooltipRef} />
        </div>
      </Jumbotron>
    </FullWith>
  );
};

export default KeywordNetwork;
