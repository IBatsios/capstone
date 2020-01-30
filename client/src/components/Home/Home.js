import React, { Component } from 'react';
import SimpleTabs from '../Tabs/SimpleTabs';  

class Home extends Component {
  state = {
    tabs: [
      { label: "Item One", content: "Item One content"},
      { label: "Item Two", content: "Item Two content"},
      { label: "Item Three", content: "Item Three content"}
    ]
  };

  render() {
    return (
      <React.Fragment>
        <h2>Home</h2>
        <SimpleTabs tabs={this.state.tabs} />
      </React.Fragment>
    );
  }
}

export default Home;
