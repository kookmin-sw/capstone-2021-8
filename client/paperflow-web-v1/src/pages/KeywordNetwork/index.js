import React, { useEffect, useState, useRef } from 'react';
import { select, zoom } from 'd3';
import { Jumbotron } from 'react-bootstrap';

import Network from '../../components/Network';
import Tooltip from '../../components/Network/Tooltip';
import DefaultLayout from '../../layouts/Layouts/Default';
import { data } from '../../assets/strings/MockUp/Network/data';
import { nodeStandard, linkStandard } from '../../assets/strings/MockUp/Network/config';

import stylesDesktopDefault from './DesktopDefault.module.scss';

const KeywordNetwork = () => {
  const styles = stylesDesktopDefault;

  const svgRef = useRef();
  const tooltipRef = useRef();

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

  const [networkData, setNetworkData] = useState({
    nodes: [],
    links: [],
  });

  // Set network data
  useEffect(() => {
    const nodes = data.nodes.map((nodeList, idx) => (nodeList.map((node) => ({
      id: node,
      depth: idx,
      radius: nodeStandard[idx].radius,
      color: nodeStandard[idx].color,
    }))));
    const links = data.links.map((linkList) => linkList.target.map((target) => ({
      source: linkList.source,
      target,
      distance: linkStandard[linkList.depth[0]][linkList.depth[1]],
    })));

    setNetworkData({
      nodes: nodes.flat(),
      links: links.flat(2),
    });
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

export default KeywordNetwork;
