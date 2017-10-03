import React, { Component } from 'react';

class Input extends Component {
  constructor() {
    super();
    this.addData = this.addData.bind(this);
  }

  addData(event) {
    const newCourseData = {
      date: this.refs.date.value,
      trailhead: this.refs.trailheadData.value,
      Vistors: this.refs.vistorCount.value,
      user: this.refs.user.value
    };
    if (this.refs.user.value == '') {
      alert('Please enter Name!');
    }
    if (this.refs.vistorCount.value == '') {
      alert('Please enter number!');
    }
    event.preventDefault();

    if (this.refs.user.value || this.refs.vistorCount.value != '') {
      alert('Thanks for counting!');
    }
    this.props.updateCountData(newCourseData);
  }

  render() {
    return (
      <div className="inputData dateTrailhead" id="inputDataFields">
        <div>
          <h4>Date</h4>
          <input type="text" ref="date" value={this.props.day} />
        </div>
        <div>
          <h4>Location</h4>
          <input type="text" ref="trailheadData" value={this.props.trailhead} />
        </div>
        <div>
          <h4>Unique Vistors</h4>
          <input type="text" ref="vistorCount" />
        </div>
        <div>
          <h4>Counter Info</h4>
          <input type="text" ref="user" />
        </div>
        <div className="btn">
          <button className="button" onClick={this.addData}>
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default Input;
