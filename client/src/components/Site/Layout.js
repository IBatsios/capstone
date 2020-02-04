import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Home } from '../Home';
import { About } from '../About';
import { Watercooler } from '../Watercooler';
import TabBar from '../Tabs/TabBar';
import Tabs from '../Tabs/Tabs';
import TabPanel from '../Tabs/TabPanel';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.displayName = 'Layout';

    this.state = {
      tabs: [
        { label: "Home", content: <Home />},
        { label: "Watercooler", content: <Watercooler />},
        { label: "About Us", content: <About />}
      ],
      activeTab: parseInt(sessionStorage.getItem(this.displayName)) || 0 
    };
  }

  handleChange = (newValue) => {
    this.setState({ activeTab: newValue }); 
    sessionStorage.setItem(
      this.displayName,
      newValue.toString()
    );
    this.forceUpdate();
  }


  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <TabBar>
          <Tabs {...this.state} onChange={this.handleChange} centered/>
        </TabBar>
        {this.state.tabs.map((tab, index) => (
          <TabPanel value={this.state.activeTab} index={index} key={index}>
            {tab.content}
          </TabPanel>
        ))} 
      </React.Fragment>
    );
  }
}

export default Layout;
