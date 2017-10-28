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
    if (this.refs.user.value === '') {
      alert('Please enter Name!');
    }
    if (this.refs.vistorCount.value === '') {
      alert('Please enter number!');
    }
    event.preventDefault();

    if (this.refs.user.value || this.refs.vistorCount.value != '') {
      alert('Thanks for counting!');
      this.props.updateCountData(newCourseData);
    }
    const updatedData = (document.getElementById('count1').value = '');
    document.getElementById('count2').value = '';
    //Don't know if this is needed but added for testing sake
    console.log(updatedData);
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
          <input type="text" ref="vistorCount" id="count1" />
        </div>
        <div>
          <h4>Counter Name</h4>
          <input type="text" ref="user" id="count2" />
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
