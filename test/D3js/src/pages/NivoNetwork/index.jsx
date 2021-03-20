import React, { useEffect } from 'react';
import Network from './component/Network';
import networkMockUp from '../../data/networkMockUp4.json'
import * as d3 from 'd3';

const App = () => {
  let style = {
    width: '1000px',
    height: '1000px',
  }

  useEffect(() => {
    console.log(d3.selectAll('circle'));
  }, [])

  return (
    <div style={style}>
      <Network data={networkMockUp}/>
    </div>
  )
}

export default App;