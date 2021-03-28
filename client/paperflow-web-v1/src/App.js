import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './pages/Landing';
import KeywordNetwork from './pages/KeywordNetwork';
import NavBar from './components/NavBar';

const App = () => (
  <BrowserRouter>
    <NavBar />
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/KeywordNetwork" component={KeywordNetwork} />
    </Switch>
  </BrowserRouter>
);

export default App;
