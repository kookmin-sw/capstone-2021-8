import React, { useRef } from 'react';

import styles from './Styles.module.scss';

const CustomNode = (nodeInfo) => {
  const nodeRef = useRef();

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
