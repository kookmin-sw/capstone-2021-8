import React from 'react';
import styles from './style.module.css';
import Bubble from './Component/Bubble';
import bubbleMockUp from '../../data/bubbleMockUp.json';

const App = () => {
  const style = styles;

  return (
    <div className={style.container}>
      <Bubble root={bubbleMockUp}/>
    </div>
  )
}

export default App;