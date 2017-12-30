import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import Download from './navbar/downloadbutton.js';
import Footer from './main/footer.js';
import './styles/App.css';
import Notifications, {notify} from 'react-notify-toast';

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
      <div>
        <Notifications />
        <Navbar className="App-header">
          <Navbar.Header className="Directory">
            {!isAuthenticated() && (
              <span className="topbtn">
              <Button
                bsStyle="primary"
                className="btn-margin"
                onClick={this.login.bind(this)}
              >
                Log In
              </Button>
              </span>
            )}
            {isAuthenticated() && (
              <span className="topbtn">
                <Download />
                <Button
                  bsStyle="primary"
                  className="btn-margin"
                  onClick={this.logout.bind(this)}
                >
                  Log Out
                </Button>
              </span>
            )}
          </Navbar.Header>
        </Navbar>
      </div>
    );
  }
}

export default App;
