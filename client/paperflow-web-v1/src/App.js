import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './pages/Landing';
import Search from './pages/Search';
import PaperDetail from './pages/PaperDetail';
import KeywordNetwork from './pages/KeywordNetwork';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/paper-detail" component={PaperDetail} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/" component={Landing} />
      <Route path="/KeywordNetwork" component={KeywordNetwork} />
    </Switch>
  </BrowserRouter>
);

export default App;
