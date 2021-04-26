import React from 'react';
import { Router } from 'react-router-dom';
import ReactDOM from 'react-dom';

import App from './App';
import { StoreProvider } from './hooks/useRootData';
import history from './utils/history';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <Router history={history}>
    <StoreProvider>
      <App />
    </StoreProvider>
  </Router>,
  document.getElementById('root'),
);
