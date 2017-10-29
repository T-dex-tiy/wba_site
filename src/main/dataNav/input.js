import React, { Component } from 'react';

class Input extends Component {
  constructor() {
    super();
    this.state = { visitors: null, user: null };
    this.addData = this.addData.bind(this);
  }

  addData(event) {
    const visitors = this.refs.visitorCount.value ? this.refs.visitorCount.value : this.props.dateCountData['visitors'];
    const user = localStorage.getItem('email') ? localStorage.getItem('email') : this.props.dateCountData['user'];
    this.setState({
      visitors: visitors,
      user: user
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
    const data = this.props.dateCountData;
    if (this.props.season != null && this.props.season != '' && this.props.trailhead != null && this.props.trailhead != '' && this.props.date != null && this.props.date != '') {
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
            <div>Current value: {this.state.visitors ? this.state.visitors : (this.props.dateCountData.visitors ? this.props.dateCountData.visitors : 0)}</div>
            <div>New value: <input type="text" ref="visitorCount" /></div>
          </div>
          <div>
            <h4>Counter Name:</h4>
            <div>Current value: {this.state.user ? this.state.user : (this.props.dateCountData.user ? this.props.dateCountData.user : '' )}</div>
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
