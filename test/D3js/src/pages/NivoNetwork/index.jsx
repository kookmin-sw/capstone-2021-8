import React, { useEffect, useRef, useState } from 'react';
import Network from './component/Network';
// import networkMockUp from '../../data/networkMockUp4.json'
import networkMockUp from '../../data/networkMockUpComplex.json'
import * as d3 from 'd3';

const App = () => {
  let style = {
    width: '100%',
    height: '500px',
    border: '2px solid',
  }

  let style2 = {
    width: '500px',
    height: '300px',
    border: '2px solid',
  }

  const svgRef = useRef();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const parentDiv = d3.select(svgRef.current);
      if (parentDiv.node().querySelector('g') !== null) {

        // initial setting
        parentDiv.select('g').attr('transform', 'translate(0,0) scale(1)');

        // drag
        /*
        const dragContainer = d3.drag()
          .on('drag', function(d) {
            // translate(1,2) scale(1)
            let position = parentDiv.select('g').attr('transform');
            position = position.replace('translate(', '').replace(' scale(', ',').replaceAll(')', '').split(',')
            let x = Number(position[0]);
            let y = Number(position[1]);
            let k = Number(position[2]);
            console.log('drag : ', x, y, k)
            parentDiv.select('g').attr('transform', 'translate(' + [x + d.dx, y + d.dy] + ') scale(' + k + ')');
          })
        */
        //d3.select(svgRef.current).call(dragContainer);

        // zoom
        
        const zoomContainer = d3.zoom()
          .on('zoom', function(d) {
            parentDiv.select('g').attr('transform', 'translate(' + [d.transform.x, d.transform.y] + ') scale(' + d.transform.k + ')');
          })
        
        d3.select(svgRef.current)
          .call(zoomContainer)
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div>
        <p style={style2}>
          here
        </p>
      </div>
      <div 
        style={style}
        ref={svgRef}
      >
          <Network 
            data={networkMockUp}
          />
      </div>
    </div>
  )
}

export default App;