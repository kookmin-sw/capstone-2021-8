import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import Test from './pages/Test';
import NodeGraphTest from './pages/NodeGraphTest';
import NodeGraph from './pages/NodeGraph';

const App = () => {
  return (
    <BrowserRouter>
      <Route exact path='/' component={Home}/>
      <Route path='/Test' component={Test}/>
      <Route path='/NodeGraphTest' component={NodeGraphTest}/>
      <Route path='/NodeGraph' component={NodeGraph}/>
    </BrowserRouter>
  )
}


export default App;