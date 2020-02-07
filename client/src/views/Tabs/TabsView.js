import React, { Component } from 'react';
import TabBar from '../../components/Tabs/TabBar';
import Tabs from '../../components/Tabs/Tabs';
import TabContent from '../../components/Tabs/TabContent';

class TabsView extends Component {

  constructor(props) {
    super(props);
    this.displayName = this.constructor.name;

  }

  handleChange = (newValue) => {
    this.setState({ activeTab: newValue }); 
    this.forceUpdate();
  }

  activeTab() {
    return parseInt(sessionStorage.getItem(this.displayName)) || 0;
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
        <TabBar>
          <Tabs {...this.state} onChange={this.handleChange}/>
        </TabBar>
        <TabContent {...this.state} />
      </React.Fragment>
    );
  }
}

export default TabsView;
