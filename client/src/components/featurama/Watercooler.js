import React, { Component } from "react";
import { Interests } from "components/featurama";
import UserContext from "components/featurama/UserContext";

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
