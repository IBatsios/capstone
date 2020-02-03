import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Home } from './components/Home';
import { About } from './components/About';
import { Watercooler } from './components/Watercooler';
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
