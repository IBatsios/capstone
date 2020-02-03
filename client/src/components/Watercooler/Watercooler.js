import React, { Component } from 'react';
import SimpleTabs from '../Tabs/SimpleTabs';  

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
        <SimpleTabs
          tabs={this.state.tabs}
          value={this.state.activeTab}
          onValueChange={this.handleValueChange} />
      </React.Fragment>
    );
  }
}

export default Watercooler;
