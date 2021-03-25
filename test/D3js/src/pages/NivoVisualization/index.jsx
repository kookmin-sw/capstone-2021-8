import React from 'react';
import Pie from './component/Pie';
import Bump from './component/Bump';
import pieData from '../../data/pieMockUp.json';
import bumpData from '../../data/bumpMockUp.json';

const App = () => {
  const style = {
    width: '400px',
    height: '400px',
    border: '1px solid',
  }

  const style2 = {
    width: '800px',
    height: '400px',
    border: '1px solid'
  }
  
  return (
    <div>
      <div style={style}>
        <Pie data={pieData}/>
      </div>
      <div style={style2}>
        <Bump data={bumpData}/>
      </div>
    </div>
  )
}


export default App;