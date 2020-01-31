import React, { Component } from 'react';
import SimpleTabs from '../Tabs/SimpleTabs';  

class Home extends Component {
  static newValue = 0;
  state = {
    tabs: [
      { label: "Item One", content: "Item One content"},
      { label: "Item Two", content: "Item Two content"},
      { label: "Item Three", content: "Item Three content"}
    ],
    value: 0
  };

  handleValueChange = (newValue) => {
    Home.newValue = newValue;
    //this.setState({ value: newValue });
   this.setState({ value: newValue });
    //Home.forceUpdate();
  }

  render() {
    return (
      <React.Fragment>
        <h2>Home</h2>
        <SimpleTabs
          tabs={this.state.tabs}
          value={Home.newValue}
          onValueChange={this.handleValueChange} />
      </React.Fragment>
    );
  }
}

export default Home;
