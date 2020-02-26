import React, { Component } from "react";
import { Interests } from "app/components/Interests";
import UserContext from "app/context/UserContext";

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
