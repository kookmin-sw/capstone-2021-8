import React from 'react';

import NavBar from '../../../components/NavBar';

const App = ({ children, className }) => (
  <div className={className}>
    <NavBar />
    {children}
  </div>
);

export default App;
