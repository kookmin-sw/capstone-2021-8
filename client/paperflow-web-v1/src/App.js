import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './pages/Landing';
import KeywordNetwork from './pages/KeywordNetwork';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/KeywordNetwork" component={KeywordNetwork} />
    </Switch>
  </BrowserRouter>
);

export default App;
