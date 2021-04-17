import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './pages/Landing';
import KeywordNetwork from './pages/KeywordNetwork';
import FlowGraph from './pages/FlowGraph';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/KeywordNetwork" component={KeywordNetwork} />
      <Route path="/FlowGraph" component={FlowGraph} />
    </Switch>
  </BrowserRouter>
);

export default App;
