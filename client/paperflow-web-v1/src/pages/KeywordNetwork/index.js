import React, { useEffect, useRef, useState } from 'react';
import { select, zoom } from 'd3';
import { Jumbotron } from 'react-bootstrap';

import Network from '../../components/Network';
import data from '../../assets/strings/MockUp/Network/data.json';

import styles from './Styles.module.scss';

const App = () => {
  const svgRef = useRef();
  const tooltipRef = useRef();
  const [tooltipInfo, setTooltipInfo] = useState({
    visible: false,
    x: 0,
    y: 0,
    id: '',
  });

  const handleTooltipInfo = (next) => {
    // If clicked same element, visible false,
    // If clicked other element, visible true,
    // Set other info
    setTooltipInfo({ ...next, visible: !(tooltipInfo === next.id) });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const parentDiv = select(svgRef.current);

      if (parentDiv.node().querySelector('g') !== null) {
        // initial setting
        parentDiv.select('g').attr('transform', 'translate(0,0) scale(1)');
        parentDiv.selectAll('circle')
          .on('mouseover', (d) => {
            setTooltipInfo({
              visible: true,
              x: d.x,
              y: d.y,
              id: d.target.dataset.id,
            });
          })
          .on('mouseout', () => {
            setTooltipInfo({ ...tooltipInfo, visible: false });
          });

        // zoom and drag
        const container = zoom()
          .on('zoom', (d) => {
            parentDiv.select('g').attr('transform', `translate(${[d.transform.x, d.transform.y]}) scale(${d.transform.k})`);
          });
        select(svgRef.current).call(container);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (tooltipInfo.visible) {
      select(tooltipRef.current).style('transform', `translate(${tooltipInfo.x}px,${tooltipInfo.y}px)`);
    }
  }, [tooltipInfo]);

  return (
    <Jumbotron id={styles.networkContainer}>
      <div
        className={styles.network}
        ref={svgRef}
      >
        <Network
          data={data}
          handleTooltipInfo={handleTooltipInfo}
        />
        {tooltipInfo.visible && (
        <div
          className={styles.tooltip}
          ref={tooltipRef}
        >
          {tooltipInfo.id}
        </div>
        )}
      </div>
    </Jumbotron>
  );
};

export default App;
