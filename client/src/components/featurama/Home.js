import React, { Component } from "react";
import { Interests } from "components/featurama";
import UserContext from "components/featurama/UserContext";

class Home extends Component {
  static contextType = UserContext;

  render() {
    return(
      <div>
        <Interests parent="home"
         activeTab={this.context.home}
         />
        {this.props.children}
      </div>
    );
  }
}

export default Home;
