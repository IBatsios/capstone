import React, { Component } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

class Interests extends Component {

  state = {
    activeTab: 0
  }

  handleChange = (event, newValue) => {
    this.setState({activeTab: newValue});
    sessionStorage.setItem(
      this.props.uri,
      newValue.toString()
    );
  }

  activeTab() {
    return parseInt(sessionStorage.getItem(this.props.uri)) || this.state.activeTab;
  }

  render() {
    const interests = this.props.interests;
    return(
      <Tabs value={this.activeTab()} onChange={this.handleChange}>
          {interests.map((interest, index) => (
            <Tab label={interest} value={index} key={index} />
          ))}
      </Tabs>
    );
  }
}

export default Interests;
