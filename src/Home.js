import React, { Component } from 'react';
import firebase from 'firebase';
import Rebase from 're-base';
import TopNav from './navbar/TopNav.js';
import Footer from './main/footer.js';
import Info from './main/Info.js';
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
      date: null,
      show: '',
      dateCountData: {}
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
      observations: null,
      dateCountData: {}
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
            observations: null,
            dateCountData: {}
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
    this.setState({ observations: null });
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
          this.setState({
            date: dateValue,
            observations: data['times'],
            dateCountData: this.state.countData[`${this.state.season}-${this.state.trailhead}-${dateValue}`]
          });
        }
      }
    );
  }

  updateCountData(addData) {
    const key = `${addData['season']}-${addData['trailhead']}-${addData['date']}`;
    base.post(`countData/${key}`, {
      data: addData
    }).catch(err => {
      console.log(err);
    });
  }

  showPhoto(event) {
    const viewState = this.state.show;
    const type = event.target.name;
    const val = event.target.checked;
    viewState[type] = val;

    this.setState({ show: viewState });
  }

  render() {
    return (
      <div className="App">
        <div className="App-intro">
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
            dateCountData={this.state.dateCountData}
          />
          <Display
            observations={this.state.observations}
            trailhead={this.state.trailhead}
            url={this.state.url}
            show={this.state.show}
            showPhoto={this.showPhoto.bind(this)}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
