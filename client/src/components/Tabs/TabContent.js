import React, { Component } from 'react';
import TabPanel from './TabPanel';

class TabContent extends Component {

  render() {
    return (
      <React.Fragment>
        {this.props.tabs.map((tab, index) => (
          <TabPanel value={this.props.activeTab} index={index} key={index}>
            {tab.content}
          </TabPanel>
        ))} 
      </React.Fragment>
    );
  }
}

export default TabContent;
