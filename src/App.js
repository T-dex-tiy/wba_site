import React, { Component } from 'react';
import firebase from 'firebase';
import Rebase from 're-base';
import TopNav from "./navbar/TopNav.js";
import Footer from './main/footer.js';
import './styles/App.css';


const app= firebase.initializeApp({
  apiKey: "AIzaSyDxOMWtQdyQ4O83ZGFEkiChZL1iTwtj1TQ",
  authDomain: "wba-site.firebaseapp.com",
  databaseURL: "https://wba-site.firebaseio.com",
  storageBucket: "wba-site.appspot.com",
});

const base = Rebase.createClass(app.database());

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      Location:{},
      Date:{},
    }
  }

  componentDidMount(){
    base.syncState(`Location`, {
      context: this,
      state: 'Location',
    });
  }
  componentWillUnmount(){
  base.removeBinding(this.ref);
}

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <TopNav className="Directory"/>
        </div>
        <div>
          <p className="App-intro">
          </p>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
