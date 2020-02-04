import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './TabPanel';
import TabsStyles from './TabsStyles';

class SimpleTabs extends Component {

  handleChange = (event, value) => {
    this.props.onValueChange(value);
  };

  render() {
    const  classes = TabsStyles;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={this.props.value} onChange={this.handleChange} aria-label="simple tabs">
            {this.props.tabs.map((tab, index) => (
              <Tab label={tab.label} key={index} />
            ))} 
          </Tabs>
        </AppBar>
        {this.props.tabs.map((tab, index) => (
          <TabPanel value={this.props.value} index={index} key={index}>
            {tab.content}
          </TabPanel>
        ))} 
      </div>
    );
  }
}

export default SimpleTabs;
