import React, { Component } from 'react';
import firebase from 'firebase';
import Dropbox from 'dropbox';
import Rebase from 're-base';
import TopNav from "./navbar/TopNav.js";
import Footer from './main/footer.js';
import Info from './main/Info.js';
import Display from './main/display.js';
import {EventEmitter} from 'events';
import Auth from './Auth.js';
import './styles/App.css';


const app= firebase.initializeApp({
  apiKey: "AIzaSyDxOMWtQdyQ4O83ZGFEkiChZL1iTwtj1TQ",
  authDomain: "wba-site.firebaseapp.com",
  databaseURL: "https://wba-site.firebaseio.com",
  storageBucket: "wba-site.appspot.com",
});

const dbx = new Dropbox({ accessToken: 'h6N_EYnf5PQAAAAAAABY1Jks79ye_U6M8MyTMVQ4Xf3JktJ2Z8mWTgkUi9ZD9Ces' });

dbx.filesListFolder({path: '/' })
  .then(function(response) {
    console.log('response', response.entries);
  })
  .catch(function(error) {
    console.log("Error", error);
  });

console.log(dbx.filesListFolder());

const base = Rebase.createClass(app.database());




class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      data:{},

    }
  }

  componentDidMount(){
    base.syncState(`data`, {
      context: this,
      state: 'data',
    });

  }
  componentWillUnmount(){
  base.removeBinding(this.ref);
}


componentWillMount(){
  this.eventEmitter = new EventEmitter()

    this.eventEmitter.addListener("updatePhoto", ({data}) => {
      this.userScreen({newDisplayPhoto: data})
    });

}


  render() {

    return (
      <div className="App">
        <div>
          <p className="App-intro">
            <Info displayLocation={this.state.data}
              eventEmitter={this.eventEmitter}/>
            <Display displayPics={this.state.data}/>
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
