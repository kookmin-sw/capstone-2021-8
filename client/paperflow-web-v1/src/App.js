import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from './pages/Landing';
import Search from './pages/Search';
import PaperDetail from './pages/PaperDetail';
import KeywordNetwork from './pages/KeywordNetwork';
import EmailInputPage from './pages/EmailInput';
import Statistics from './pages/Statistics';

const App = () => (

  <Switch>
    <Route path="/paper-detail" component={PaperDetail} />
    <Route path="/search" component={Search} />
    <Route path="/keyword-network" component={KeywordNetwork} />
    <Route path="/email-input" component={EmailInputPage} />
    <Route path="/statistics" component={Statistics} />
    <Route path="/" component={Landing} />
  </Switch>

);

export default App;
