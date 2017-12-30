import React, { Component } from 'react';
import Footer from './main/footer.js';
import Info from './main/Info.js';
import Display from './main/display.js';
import './styles/App.css';
import Database from './Database.js';

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
    this.firebase = Database.sharedInstance.firebase;
  }

  componentDidMount() {
    this.firebase.syncState(`seasons`, {
      context: this,
      state: 'seasons'
    });
    this.firebase.syncState(`countData`, {
      context: this,
      state: 'countData'
    });
  }
  componentWillUnmount() {
    this.firebase.removeBinding(this.ref);
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
    this.firebase.fetch(
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
    this.setState({ date: null, observations: null, dateCountData: {} });
    this.firebase.fetch(
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
            dateCountData: this.state.countData[
              `${this.state.season}-${this.state.trailhead}-${dateValue}`
            ]
          });
        }
      }
    );
  }

  updateCountData(addData) {
    const key = `${addData['season']}-${addData['trailhead']}-${addData[
      'date'
    ]}`;
    this.firebase
      .post(`countData/${key}`, {
        data: addData
      })
      .catch(err => {
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
            counterValue={(this.state.dateCountData != null && this.state.dateCountData.visitors != null) ? this.state.dateCountData.visitors : 0}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
