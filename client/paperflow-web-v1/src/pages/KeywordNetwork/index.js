import React, { useEffect, useState, useRef } from 'react';
import { select, zoom } from 'd3';
import { Jumbotron } from 'react-bootstrap';

import Network from '../../components/Network';
import Tooltip from '../../components/Network/Tooltip';
import DefaultLayout from '../../layouts/Layouts/Default';
import data from '../../assets/strings/Network/MockUp/2020-12-data.json';
import {
  nodeStandard, linkStandard, month, year,
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

  // Set network data
  useEffect(() => {
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
  }, []);

  return (
    <DefaultLayout>
      <div>
        <div>
          <div>
            Year
          </div>
          <select
            as="Select"
            onChange={handleSelect}
          >
            <option value="" selected>선택하세요</option>
            {year.map((y) => (
              <option value={y} key={y}>{y}</option>
            ))}
          </select>
        </div>
        <div>
          <div>
            Month
          </div>
          <select
            as="Select"
            onChange={handleSelect}
          >
            <option value="">선택하세요</option>
            {month.map((m) => (
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
    </DefaultLayout>
  );
};

export default KeywordNetwork;
