import React, { useRef, useEffect } from 'react';
import { select } from 'd3';
import { nodeStandard } from '../../../assets/strings/MockUp/Network/config';

import stylesDesktopDefault from './DesktopDefault.module.scss';

const CustomNode = (nodeInfo, handleTooltipInfo) => {
  const styles = stylesDesktopDefault;

  const nodeRef = useRef();

  const handleTooltip = (d, visible) => {
    handleTooltipInfo({
      visible,
      x: d.x,
      y: d.y,
      id: nodeInfo.node.id,
    });
  };

  useEffect(() => {
    select(nodeRef.current)
      .on('mouseover', (d) => handleTooltip(d, true))
      .on('mousemove', (d) => handleTooltip(d, true))
      .on('mouseout', (d) => handleTooltip(d, false));

    const words = nodeInfo.node.id.split(' ');
    const nodeText = select(nodeRef.current).select('text');
    let y = 0;
    if (words.length >= 2 && words.length % 2 === 0) {
      y = -0.5;
    } else if (words.length >= 2 && words.length % 2 === 1) {
      y = -1;
    }
    for (let i = 0; i < words.length; i += 1) {
      nodeText
        .append('tspan')
        .attr('x', 0)
        .attr('y', `${String(y)}em`)
        .text(words[i]);
      y += 1;
    }
  }, []);

  return (
    <g
      ref={nodeRef}
      transform={`translate(${[nodeInfo.x, nodeInfo.y]}) scale(0.7)`}
    >
      <circle
        r={nodeInfo.radius}
        fill={nodeInfo.color}
        stroke={nodeInfo.borderColor}
        strokeWidth={nodeInfo.borderWidth}
        data-id={nodeInfo.node.id}
      />
      <text
        textAnchor="middle"
        dominantBaseline="central"
        width={2 * nodeInfo.radius * Math.cos(Math.PI / 4)}
        height={2 * nodeInfo.radius * Math.cos(Math.PI / 4)}
        className={styles.nodeText}
        fontSize={nodeStandard[nodeInfo.node.depth].fontSize}
      />
    </g>
  );
};

export default CustomNode;
