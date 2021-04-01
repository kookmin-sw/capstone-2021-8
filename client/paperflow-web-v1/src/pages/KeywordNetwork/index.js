import React, { useEffect, useRef } from 'react';
import { select, zoom } from 'd3';
import { Jumbotron } from 'react-bootstrap';

import Network from '../../components/Network';
import Tooltip from '../../components/Network/Tooltip';
import data from '../../assets/strings/MockUp/Network/data.json';

import styles from './Styles.module.scss';

const App = () => {
  const svgRef = useRef();
  const tooltipRef = useRef();

  // tooltip functions
  const handleTooltipInfo = (next) => {
    const tooltip = select(tooltipRef.current);
    tooltip.text(next.id);
    if (next.visible) {
      tooltip
        .style('display', null)
        .style('transform', `translate(${next.x + 20}px,${next.y - 20}px)`);
    } else {
      tooltip.style('display', 'none');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const parentDiv = select(svgRef.current);

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
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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
        <Tooltip tooltipRef={tooltipRef} />
      </div>
    </Jumbotron>
  );
};

export default App;
