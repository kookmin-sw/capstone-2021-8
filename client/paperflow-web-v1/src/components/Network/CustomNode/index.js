import React, { useRef, useEffect } from 'react';
import { select } from 'd3';

import styles from './Styles.module.scss';

const CustomNode = (nodeInfo, handleTooltipInfo) => {
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
  }, []);

  return (
    <g
      ref={nodeRef}
      transform={`translate(${[nodeInfo.x, nodeInfo.y]}) scale(1)`}
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
      >
        {nodeInfo.node.id}
      </text>
    </g>
  );
};

export default CustomNode;
