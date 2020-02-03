import React, { Component } from 'react';
import SimpleTabs from '../Tabs/SimpleTabs';  

class Home extends Component {
  constructor(props) {
    super(props);
    this.displayName = 'Home';

    this.state = {
      tabs: [
        { label: "Home Item One", content: "Home Item One content"},
        { label: "Home Item Two", content: "Home Item Two content"},
        { label: "Home Item Three", content: "Home Item Three content"}
      ],
      activeTab: parseInt(sessionStorage.getItem(this.displayName)) || 0 
    };
  }

  handleValueChange = (newValue) => {
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
        <h2>Home</h2>
        <SimpleTabs
          tabs={this.state.tabs}
          value={this.state.activeTab}
          onValueChange={this.handleValueChange} />
      </React.Fragment>
    );
  }
}

export default Home;
