import React, { Component } from "react";
import User from 'user';
import { Copyright } from 'layout/Layout';

class App extends Component {
  render() {
    return (
      <>
        <User />
        <Copyright className="copyright" />
      </>
    );
  }
}

export default App;
