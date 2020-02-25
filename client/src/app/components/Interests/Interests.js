import React, { Component } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import UserContext from "app/UserContext";

class Interests extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, value) {
    this.context.updateValue({ [this.props.parent]: value });
  }

  render() {
    const interests = this.context.interests;
    return(
      <div>
        <Tabs value={this.props.activeTab} onChange={this.handleChange}>
          {interests.map((interest, index) => (
            <Tab label={interest} value={index} key={index} />
          ))}
        </Tabs>
      </div>
    );
  }
}

export default Interests;
