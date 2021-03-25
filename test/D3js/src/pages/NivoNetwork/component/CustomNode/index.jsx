import React, { useRef } from 'react';

const CustomNode = node => {
  console.log(node)

  const circleRef = useRef();

  const style = {
    'font-family': 'sans-serif',
    'font-size': '20px',
    fill: 'rgb(255, 255, 255)',
  }
  
  return (
    <g
      ref={circleRef}
      transform={'translate(' + [node.x, node.y] + ') scale(1)'}
    >
      <circle
        r={node.radius}
        fill={node.color}
        stroke={node.borderColor}
        strokeWidth={node.borderWidth}
      >
      </circle>
      <text
        text-anchor="middle"
        dominant-baseline="central"
        width={2 * node.radius * Math.cos(Math.PI / 4)}
        height={2 * node.radius * Math.cos(Math.PI / 4)}
        style={style}
      >
        {node.node.id}
      </text>
    </g>
  )
};

export default CustomNode;