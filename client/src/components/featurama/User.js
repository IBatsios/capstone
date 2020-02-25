import React, { Component } from "react";
import { Header } from "components/featurama";

class User extends Component {
  render() {
    return (
      <div>
        <Header {...this.props} nav={this.props.nav} />
        {this.props.children}
      </div>
    );
  }
}

export default User;
