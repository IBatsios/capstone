import React, { Component } from "react";
import { Interests } from "app/components/Interests";
import UserContext from "app/context/UserContext";

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
