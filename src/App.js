import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import Download from './navbar/downloadbutton.js';
import './styles/App.css';

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <Navbar className="App-header">
        <Navbar.Header className="Directory">
          {!isAuthenticated() && (
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={this.login.bind(this)}
            >
              Log In
            </Button>
          )}
          {isAuthenticated() && (
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={this.logout.bind(this)}
            >
              Log Out
            </Button>
          )}
        </Navbar.Header>
      </Navbar>
    );
  }
}

export default App;
