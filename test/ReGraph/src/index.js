import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import { StoreProvider } from './stores/useRootData'


ReactDOM.render(
  <StoreProvider>
    <App/>
  </StoreProvider>,
  document.getElementById('root')
);