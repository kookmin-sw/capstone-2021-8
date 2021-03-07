import React, { useRef, useEffect, useState } from 'react';
import { select } from 'd3';

const App = () => {
  const svgRef = useRef();
  const [data, setData] = useState([5, 20, 25, 30, 40]);

  useEffect(() => {
    const svg = select(svgRef.current);
    svg
      .selectAll('circle')
      .data(data)
      .join(
        (enter) => enter.append('circle'),
        (update) => update.attr('class', 'updated'),
        (exit) => exit.remove()
      )
      .attr('r', (value) => value)
      .attr('cx', (value) => value)
      .attr('cy', (value) => value)
      .attr('stroke', 'red');
  }, [data]);

  const increaseData = () => {
    setData(data.map((value) => value + 5));
  };
  const decreaseData = () => {
    setData(data.map((value) => value - 5));
  };

  return (
    <div>
      <svg ref={svgRef}>
        <circle />
      </svg>
      <button onClick={increaseData}>+5</button>
      <button onClick={decreaseData}>-5</button>
    </div>
  )
}

export default App;