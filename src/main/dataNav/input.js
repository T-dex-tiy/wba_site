import React, { Component } from 'react';

class Input extends Component {
  constructor() {
    super();
    this.addData = this.addData.bind(this);
  }

  addData(event) {
    const newCountData = {
      season: this.props.season,
      date: this.props.date,
      trailhead: this.props.trailhead,
      visitors: this.refs.visitorCount.value ? this.refs.visitorCount.value : this.props.dateCountData['visitors'],
      user: this.refs.user.value ? this.refs.user.value : this.props.dateCountData['user']
    };
    event.preventDefault();

    this.props.updateCountData(newCountData);
    console.log(newCountData);
  }

  render() {
    const data = this.props.dateCountData;
    console.log(data);
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
          <div>Current value: {this.props.dateCountData.visitors ? this.props.dateCountData.visitors : 0}</div>
          <div>New value: <input type="text" ref="visitorCount" /></div>
        </div>
        <div>
          <h4>Counter Name:</h4>
          <div>Current value: {this.props.dateCountData.user ? this.props.dateCountData.user : ''}</div>
          <div>New value: <input type="text" ref="user" /></div>
        </div>
        <div className="btn">
          <button className="button" onClick={this.addData}>
            Update
          </button>
        </div>
      </div>
    );
  }
}

export default Input;
