import React, { Component } from 'react';
import TabBar from '../Tabs/TabBar';
import Tabs from '../Tabs/Tabs';
import TabPanel from '../Tabs/TabPanel';

class Watercooler extends Component {
  constructor(props) {
    super(props);
    this.displayName = 'Watercooler';

    this.state = {
      tabs: [
        { label: "Watercooler Item One", content: "Watercooler Item One content"},
        { label: "Watercooler Item Two", content: "Watercooler Item Two content"},
        { label: "Watercooler Item Three", content: "Watercooler Item Three content"}
      ],
      activeTab: parseInt(sessionStorage.getItem(this.displayName)) || 0 
    };
  }

  handleValueChange = (newValue) => {
    this.setState({ activeTab: newValue }); 
    this.forceUpdate();
  }

  handleChange = (newValue) => {
    this.setState({ activeTab: newValue }); 
    this.forceUpdate();
  }

  componentWillUnmount() {
    sessionStorage.setItem(
      this.displayName,
      this.state.activeTab.toString()
    );
  }

  render() {
    return (
      <React.Fragment>
        <h2>Watercooler</h2>
        <TabBar>
          <Tabs {...this.state} onChange={this.handleChange}/>
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

export default Watercooler;
