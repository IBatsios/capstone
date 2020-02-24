import React, { Component } from "react";
import { Interests } from "app";
import UserContext from "app/UserContext";

class Watercooler extends Component {
  static contextType = UserContext;

  render() {
    return (
      <div>
        <Interests parent="watercooler"
         activeTab={this.context.watercooler}
         />
      </div>
    );
  }
}

export default Watercooler;
