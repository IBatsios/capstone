import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Home } from './components/Home';
import { About } from './components/About';
import { Watercooler } from './components/Watercooler';
import logo from './logo.svg';
import './App.css';
import SiteTabs from './components/Tabs/SiteTabs';  

class App extends Component {
  state = {
    tabs: [
      { label: "Home", content: <Home />},
      { label: "Watercooler", content: <Watercooler />},
      { label: "About Us", content: <About />}
    ],
    value: 0
  };

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <SiteTabs tabs={this.state.tabs} value={this.state.value} />
      </React.Fragment>
    );
  }
}

export default App;
