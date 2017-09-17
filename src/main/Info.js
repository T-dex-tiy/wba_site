import React, { Component } from 'react';
import LocationNav from './dataNav/locationNav.js';

class Info extends Component {
  constructor(){
    super()
  }
  render() {
    return (
      <div className="left-box locationData">
           <LocationNav locationInfo={this.props.displayLocation} season={this.props.season} trailheads={this.props.trailheads} date={this.props.date} handleChange={this.props.handleChange.bind(this)} handleChangeTrailhead={this.props.handleChangeTrailhead.bind(this)} handleChangeDay={this.props.handleChangeDay.bind(this)}
              />
      </div>
     )
  }
}

export default Info
