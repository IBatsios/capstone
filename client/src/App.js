import React, { Component } from "react";
import { Router, Location } from '@reach/router'
import { Home, Interests, Watercooler, Lists, User } from "components/featurama";



class App extends Component {
  state = {
    interests: ["movies", "music"],
    nav: ["home", "watercooler", "lists"]
  }

  render() {
    return (
      <Location>
        {({ location }) => (
      <div>
        <div>
          <Router>
            <User nav={this.state.nav} path="/" location={location} >
              <Home path="home" pathname={location.pathname}>
                <Interests path="/" interests={this.state.interests} />
              </Home>

              <Watercooler  path="watercooler" pathname={location.pathname}>
                <Interests path="/" interests={this.state.interests} />
              </Watercooler>

              <Lists interests={this.state.interests} path="lists/*" />
            </User>
          </Router>
        </div>
      </div>
      )}
      </Location>
    );
  }
}


export default App;

