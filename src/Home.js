import React, { Component } from 'react';
import firebase from 'firebase';
import Rebase from 're-base';
import TopNav from "./navbar/TopNav.js";
import Footer from './main/footer.js';
import Info from './main/Info.js';
import Display from './main/display.js';
import {EventEmitter} from 'events';
import Auth from './Auth.js';
import './styles/App.css';


const app= firebase.initializeApp({
  apiKey: "AIzaSyCQXJ-iCdvSjz7DUzDn8G6xl6LNO58HV8E",
  authDomain: "wba-trail-counting.firebaseapp.com",
  databaseURL: "https://wba-trail-counting.firebaseio.com",
  storageBucket: "wba-trail-counting.appspot.com",
});


const base = Rebase.createClass(app.database());






class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      sourceData:{},

    }
  }




  componentDidMount(){
    base.syncState(`sourceData`, {
      context: this,
      state: 'sourceData',
    });
    const item = JSON.stringify(this.state.sourceData);
    window.localStorage.setItem('data', item)
  }
  componentWillUnmount(){
  base.removeBinding(this.ref);
}


componentWillMount(){
  this.eventEmitter = new EventEmitter()

    this.eventEmitter.addListener("updatePhoto", ({data}) => {
      this.userScreen({newDisplayPhoto: data})
    });


//  const stringifyObj=
//   Object.keys(this.state.sourceData).map(key=>{
//    return stringifyObj[key]
//  })
// console.log(stringifyObj);
}


  render() {

    return (
      <div className="App">
        <div>
          <p className="App-intro">
            <Info displayLocation={this.state.sourceData}
              eventEmitter={this.eventEmitter}/>
            <Display displayPics={this.state.sourceData}/>
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
