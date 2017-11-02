import React, { Component } from 'react';

class Input extends Component {
  constructor() {
    super();
    this.state = { visitors: null, user: null, season: null, trailhead: null, date: null };
    this.addData = this.addData.bind(this);
  }

  addData(event) {
    const visitors = this.refs.visitorCount.value ? this.refs.visitorCount.value : this.props.dateCountData['visitors'];
    const user = localStorage.getItem('email') ? localStorage.getItem('email') : this.props.dateCountData['user'];
    this.setState({
      visitors: visitors,
      user: user,
      season: this.props.season,
      trailhead: this.props.trailhead,
      date: this.props.date
    });
    const newCountData = {
      season: this.props.season,
      date: this.props.date,
      trailhead: this.props.trailhead,
      visitors: visitors,
      user: user
    };
    event.preventDefault();

    this.props.updateCountData(newCountData);
  }

  render() {
    var visitors = this.props.dateCountData.visitors ? this.props.dateCountData.visitors : 0;
    var user = this.props.dateCountData.user ? this.props.dateCountData.user : '';
    if (this.state.season === this.props.season && this.state.trailhead === this.props.trailhead && this.state.date === this.props.date) {
      visitors = this.state.visitors;
      user = this.state.user;
    }
    if (this.props.season !== null && this.props.season !== '' && this.props.trailhead !== null && this.props.trailhead !== '' && this.props.date !== null && this.props.date !== '') {
      return (
        <div className="inputData" id="inputDataFields">
          <div>
            <h4>Season:</h4>
            <div>{this.props.season}</div>
          </div>
          <div>
            <h4>Trailhead:</h4>
            {this.props.trailhead}
          </div>
          <div>
            <h4>Date:</h4>
            {this.props.date}
          </div>
          <div>
            <h4>Unique Visitors:</h4>
            <div>Current value: {visitors}</div>
            <div>New value: <input type="text" ref="visitorCount" /></div>
          </div>
          <div>
            <h4>Counter Name:</h4>
            <div>Current value: {user}</div>
            <div>New value: {localStorage.getItem('email')}</div>
          </div>
          <div className="btn">
            <button className="button" onClick={this.addData}>
              Update
            </button>
          </div>
        </div>
      );
    } else {
      return (<div className="inputData" id ="inputDataFields" />);
    }
  }
}

export default Input;
