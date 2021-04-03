import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { StoreProvider } from './hooks/useRootData';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById('root'),
);
