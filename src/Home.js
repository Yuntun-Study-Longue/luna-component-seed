import React from 'react';
import logo from './react.svg';
import './Home.css';

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <div className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <h2>Welcome to Luna Plugin Seed</h2>
        </div>
        <p className="Home-intro">
          To get started, edit <code>src/App.js</code> or{' '}
          <code>src/Home.js</code> and save to reload.
        </p>
        <ul className="Home-resources">
          <li>
            <a href="http://git.sysware.com.cn/idp/luna-plugin-seed">Docs</a>
          </li>
          <li>
            <a href="http://git.sysware.com.cn/idp/luna-plugin-seed/issues">Issues</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Home;
