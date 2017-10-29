import React, { Component } from 'react';
import LocationNav from './dataNav/locationNav.js';

class Info extends Component {
  constructor(){
    super()
  }
  render() {
    return (
      <div className="left-box locationData">
           <LocationNav seasons={this.props.seasons}
            season={this.props.season}
            trailheads={this.props.trailheads}
            trailhead={this.props.trailhead}
            dates={this.props.dates}
            date={this.props.date}
            handleChangeSeason={this.props.handleChange.bind(this)}
            handleChangeTrailhead={this.props.handleChangeTrailhead.bind(this)}
            handleChangeDay={this.props.handleChangeDay.bind(this)}
            updateCountData={this.props.updateCountData.bind(this)}
            dateCountData={this.props.dateCountData}
              />
      </div>
     )
  }
}

export default Info
