import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import './App.css';
import Button from './pages/Button'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/Button" component={Button} />
  </Switch>
);

export default App;
