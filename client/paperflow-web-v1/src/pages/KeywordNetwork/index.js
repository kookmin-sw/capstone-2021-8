import React, { useEffect, useState, useRef } from 'react';
import { select, zoom } from 'd3';
import {
  Jumbotron, DropdownButton, Dropdown, Form,
} from 'react-bootstrap';
import AutoSizer from 'react-virtualized-auto-sizer';
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
  const containerRef = useRef();

  const [range, setRange] = useState({
    year: '2021',
    month: '03',
  });

  const [currentHeight, setCurrentHeight] = useState(0);

  // tooltip functions
  const handleTooltipInfo = (next) => {
    const tooltip = select(tooltipRef.current);
    tooltip.select('div').text(next.id);
    if (next.visible) {
      const { offsetTop } = containerRef.current;
      tooltip
        .style('display', 'block')
        .style('transform', `translate(${next.x}px, ${next.y - offsetTop}px)`);
    } else {
      tooltip.style('display', 'none');
    }
  };

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
  }, [currentHeight]);

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
      <div className={styles.filterContainer}>
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
      </div>
      <Jumbotron id={styles.networkContainer} ref={containerRef}>
        <AutoSizer>
          {({ height, width }) => {
            setTimeout(() => setCurrentHeight(height), 10);
            return (
              <div
                style={{ height, width }}
                ref={svgRef}
              >
                <Network
                  data={setNetwork(statistics[range.year.slice(-2) + range.month])}
                  handleTooltipInfo={handleTooltipInfo}
                  style={{ height, width }}
                />
                <Tooltip tooltipRef={tooltipRef} />
              </div>
            );
          }}
        </AutoSizer>
      </Jumbotron>
    </FullWidthNoFooterLayout>
  );
};

export default KeywordNetwork;
