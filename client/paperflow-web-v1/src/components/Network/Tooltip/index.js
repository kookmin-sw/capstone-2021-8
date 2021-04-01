import React from 'react';

import styles from './Styles.module.scss';

const App = ({ tooltipRef }) => (
  <div
    className={styles.tooltip}
    ref={tooltipRef}
  />
);
export default App;
