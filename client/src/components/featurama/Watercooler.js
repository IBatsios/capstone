import React, { Component } from "react";

class Watercooler extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default Watercooler;
