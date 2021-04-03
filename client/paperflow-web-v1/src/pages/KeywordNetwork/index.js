import React, { useEffect, useState, useRef } from 'react';
import { select, zoom } from 'd3';
import { Jumbotron } from 'react-bootstrap';

import Network from '../../components/Network';
import Tooltip from '../../components/Network/Tooltip';
import DefaultLayout from '../../layouts/Layouts/Default';
// import data from '../../assets/strings/MockUp/Network/data.json';
import { data } from '../../assets/strings/MockUp/Network/realData';
import { nodeStandard, linkStandard } from '../../assets/strings/MockUp/Network/config';

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
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  const [networkData, setNetworkData] = useState({
    nodes: [],
    links: [],
  });

  let i;
  let j;
  useEffect(() => {
    const newData = {
      nodes: [],
      links: [],
    };
    for (i = 0; i < data.nodes.length; i += 1) {
      for (j = 0; j < data.nodes[i].length; j += 1) {
        newData.nodes.push({
          id: data.nodes[i][j],
          depth: i,
          radius: nodeStandard[i].radius,
          color: nodeStandard[i].color,
        });
      }
    }
    for (i = 0; i < data.links.length; i += 1) {
      for (j = 0; j < data.links[i].target.length; j += 1) {
        newData.links.push({
          source: data.links[i].source,
          target: data.links[i].target[j],
          distance: linkStandard[data.links[i].depth[0]][data.links[i].depth[1]],
        });
      }
    }
    setNetworkData(newData);
  }, []);

  return (
    <DefaultLayout>
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

export default App;
