import React, { Component } from "react";
import { UserStore } from 'data/UserStore';
import UserView from 'views/UserView';


class App extends Component {
  render() {
    return (
      <UserStore>
        <UserView />
      </UserStore>
    );
  }
}

export default App;
