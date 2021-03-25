import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const CustomNode = nodeInfo => {
  const nodeRef = useRef();

  const style = {
    'fontFamily': 'sans-serif',
    fill: 'rgb(255, 255, 255)',
  }

  useEffect(() => {
    const node = d3.select(nodeRef.current);
    node.select('text')
      .attr('fontSize', function(d) {
        return Math.min(2 * nodeInfo.radius, (2 * nodeInfo.radius - 8) / this.getComputedTextLength() * 24) + "px"; 
      })
  }, [])
  
  return (
    <g
      ref={nodeRef}
      transform={'translate(' + [nodeInfo.x, nodeInfo.y] + ') scale(1)'}
    >
      <circle
        r={nodeInfo.radius}
        fill={nodeInfo.color}
        stroke={nodeInfo.borderColor}
        strokeWidth={nodeInfo.borderWidth}
      >
      </circle>
      <text
        textAnchor="middle"
        dominantBaseline="central"
        width={2 * nodeInfo.radius * Math.cos(Math.PI / 4)}
        height={2 * nodeInfo.radius * Math.cos(Math.PI / 4)}
        style={style}
      >
        {nodeInfo.node.id}
      </text>
    </g>
  )
};

export default CustomNode;