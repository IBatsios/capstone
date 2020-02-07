import React, { Component } from 'react';
import TabBar from '../Tabs/TabBar';
import Tabs from '../Tabs/Tabs';
import TabContent from '../Tabs/TabContent';

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
        <h2>Home</h2>
        <TabBar>
          <Tabs {...this.state} onChange={this.handleChange}/>
        </TabBar>
        <TabContent {...this.state} />
      </React.Fragment>
    );
  }
}

export default Home;
