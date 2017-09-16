import React, { Component } from 'react';

class LocationDisplay extends Component {
  constructor(){
    super()
  }

  render() {
    return (
      <div>
        <div><h4>Season:</h4></div>
        <div><p>{this.props.seasons}</p></div>
        <div><h4>Trailhead:</h4></div>
        <div><p>{this.props.trailheads}</p></div>
        <div><h4>Date:</h4></div>
        <div><p>{this.props.day}</p></div>
        <div><button>This area has been counted</button></div>
      </div>
     )
  }
}

export default LocationDisplay;
