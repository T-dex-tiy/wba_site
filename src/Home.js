import React, { Component } from 'react';
import firebase from 'firebase';
import Rebase from 're-base';
import TopNav from './navbar/TopNav.js';
import Footer from './main/footer.js';
import Info from './main/Info.js';
// import dropbox from 'dropbox';
import Display from './main/display.js';
import { EventEmitter } from 'events';
import Auth from './Auth.js';
import './styles/App.css';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyCQXJ-iCdvSjz7DUzDn8G6xl6LNO58HV8E',
  authDomain: 'wba-trail-counting.firebaseapp.com',
  databaseURL: 'https://wba-trail-counting.firebaseio.com',
  storageBucket: 'wba-trail-counting.appspot.com'
});

const base = Rebase.createClass(app.database());

// var Dropbox = require('dropbox');
// var dbx = new Dropbox({
//   accessToken:
//     'dLZ2mHAXz3AAAAAAAAR9QCBlO4f8uS2Jm2ZHm2udxP6HPUt6s4S87a3Eox2ERHrr'
// });
// dbx
//   .filesListFolder({ path: '' })
//   .then(function(response) {
//     console.log(response);
//   })
//   .catch(function(error) {
//     console.log(error);
//   });

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seasons: {},
      trailheads: [],
      dates: [],
      observations: null,
      countData: {},
      season: null,
      trailhead: null,
      date: null
    };
  }

  componentDidMount() {
    base.syncState(`seasons`, {
      context: this,
      state: 'seasons'
    });
    base.syncState(`countData`, {
      context: this,
      state: 'countData'
    });
  }
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillMount() {
    this.eventEmitter = new EventEmitter();

    this.eventEmitter.addListener('updatePhoto', ({ data }) => {
      this.userScreen({ newDisplayPhoto: data });
    });
  }

  handleChange(event) {
    if (event.target.name !== 'seasons') {
      return;
    }
    var seasonValue = event.target.value;
    this.setState({
      season: seasonValue,
      trailheads: this.state.seasons[seasonValue]['trailheads'],
      trailhead: null,
      dates: [],
      date: null,
      observations: null
    });
  }
  handleChangeTrailhead(event) {
    if (event.target.name !== 'trailheads') {
      return;
    }
    var trailheadValue = event.target.value;
    base.fetch(
      'season-trailhead-dates/' + this.state.season + '-' + trailheadValue,
      {
        context: this,
        then(data) {
          this.setState({
            trailhead: trailheadValue,
            dates: data['dates'],
            date: null,
            observations: null
          });
        }
      }
    );
  }

  handleChangeDay(event) {
    if (event.target.name !== 'dates') {
      return;
    }
    var dateValue = event.target.value;
    base.fetch(
      'observations/' +
        this.state.season +
        '-' +
        this.state.trailhead +
        '-' +
        dateValue,
      {
        context: this,
        then(data) {
          console.log(data['times']);
          this.setState({
            date: dateValue,
            observations: data['times']
          });
        }
      }
    );
  }

  updateCountData(addData) {
    const newData = { ...this.state.countData };
    const time = new Date();
    const minutes = time.getMinutes();
    const hour = time.getHours();
    const month = time.getMonth();
    const day = time.getDay();
    const year = time.getFullYear();
    const key = `${hour} : ${minutes}, ${month} ,${day}${year}`;
    newData.key = key;
    newData[key] = addData;
    console.log(month);
    console.log(day);

    this.setState({ countData: newData });
  }

  render() {
    return (
      <div className="App">
        <div>
          <p className="App-intro">
            <Info
              seasons={Object.keys(this.state.seasons)}
              season={this.state.season}
              trailheads={this.state.trailheads}
              trailhead={this.state.trailhead}
              dates={this.state.dates}
              date={this.state.date}
              handleChange={this.handleChange.bind(this)}
              handleChangeTrailhead={this.handleChangeTrailhead.bind(this)}
              handleChangeDay={this.handleChangeDay.bind(this)}
              updateCountData={this.updateCountData.bind(this)}
            />
            <Display observations={this.state.observations} />
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
