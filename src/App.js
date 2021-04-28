import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import './App.css';
import SysIcon from './pages/sysIcon'
import SysButton from './pages/sysButton'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/sysIcon" component={SysIcon} />
    <Route exact path="/sysButton" component={SysButton} />
  </Switch>
);

export default App;
