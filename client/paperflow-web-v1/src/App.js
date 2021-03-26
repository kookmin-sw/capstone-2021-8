import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './pages/Landing';
import NavBar from './components/NavBar';

const App = () => (
  <BrowserRouter>
    <NavBar />
    <Switch>
      <Route exact path="/" component={Landing} />
    </Switch>
  </BrowserRouter>
);

export default App;
