import React, { Component } from "react";
import { Link } from '@reach/router'
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0
    }
  }

  handleChange = (event, newValue) => {
    this.setState({ activeTab: newValue });
  }

  activeTab() {
    const pathname = this.props.location.pathname.replace(/^\/+/g, '');
    return pathname; 
  }

  render() {
    const headerTabs = this.props.nav;
    return (
      <Tabs value={this.activeTab()} onChange={this.handleChange} centered>
          {headerTabs.map((tab, index) => (
            <Tab label={tab} component={Link} value={tab} to={tab} key={index} />
          ))}
      </Tabs>
    );
  }
}

export default Header;
