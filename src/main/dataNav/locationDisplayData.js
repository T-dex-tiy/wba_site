import React, { Component } from 'react';

class LocationDisplay extends Component {
  constructor(){
    super()
  }

  render() {
    return (
      <div>
        <div><h4>Season:</h4></div>
        <div><p>{this.props.dates}</p></div>
        <div><h4>Trailhead:</h4></div>
        <div><p>Data goes here</p></div>
        <div><h4>Date:</h4></div>
        <div><p>Data goes here</p></div>
        <div><button>This area has been counted</button></div>
      </div>
     )
  }
}

export default LocationDisplay;
