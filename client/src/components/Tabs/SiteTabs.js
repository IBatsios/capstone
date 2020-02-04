import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './TabPanel';
import TabsStyles from './TabsStyles';


class SiteTabs extends Component {
  state = {
    value: this.props.value
  }

  handleChange = (event, newValue) => {
    this.setState({ value: newValue});
  };

  render() {
    const  classes = TabsStyles; 
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={this.state.value} onChange={this.handleChange} centered>
            {this.props.tabs.map((tab, index) => (
              <Tab label={tab.label} key={index} />
            ))} 
          </Tabs>
        </AppBar>
        {this.props.tabs.map((tab, index) => (
          <TabPanel value={this.state.value} index={index} key={index}>
            {tab.content}
          </TabPanel>
        ))} 
      </div>
    );
  }
}

export default SiteTabs;
