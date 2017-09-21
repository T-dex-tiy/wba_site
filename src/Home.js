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
      countData:{},
      season: null,
      trailheads: null,
      date:null,
    }
  }




  componentDidMount(){
    base.syncState(`sourceData`, {
      context: this,
      state: 'sourceData',
    });
    base.syncState(`countData`, {
      context: this,
      state: 'countData',
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
}

handleChange(event) {
  if (event.target.name !== "seasons") {
    return;
  }
  var seasonValue = event.target.value;
  this.setState({
     season: seasonValue,
    });
}
handleChangeTrailhead(event) {
  if (event.target.name !== "trailheads") {
    return;
  }
  var trailheadValues = event.target.value;
  console.log(trailheadValues);
  this.setState({
     trailheads: trailheadValues,
    });
}

handleChangeDay(event) {
  if (event.target.name !== "dates") {
    return;
  }
  var dateValue = event.target.value;
  console.log(dateValue);
  this.setState({
     date: dateValue,
    });
}

updateCountData(addData){
  const newData= {...this.state.countData}
  const time = new Date();
  const minutes = time.getMinutes();
  const hour = time.getHours();
  const month = time.getMonth();
  const day = time.getDay();
  const year = time.getFullYear();
  const key =`${hour} : ${minutes}, ${month} ,${day}${year}`;
  newData.key= key;
  newData[key]=addData;
 console.log(month);
 console.log(day);

  this.setState({countData:newData})
}



  render() {

    return (
      <div className="App">
        <div>
          <p className="App-intro">
            <Info displayLocation={this.state.sourceData} season={this.state.season} trailheads={this.state.trailheads} date={this.state.date} handleChange={this.handleChange.bind(this)} handleChangeTrailhead={this.handleChangeTrailhead.bind(this)} handleChangeDay={this.handleChangeDay.bind(this)} updateCountData={this.updateCountData.bind(this)} />
            <Display displayPics={this.state.sourceData} season={this.state.season} trailhead={this.state.trailheads} date={this.state.date}/>
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
