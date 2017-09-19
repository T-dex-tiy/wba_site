import React, { Component } from 'react';
import Dropdown from '../dataNav/dropdownNav.js';
import DateDropdown from '../dataNav/dateDropdown.js';
import LocationDropdown from '../dataNav/LocationDropdown.js';
import LocationDisplay from '../dataNav/locationDisplayData.js';
import Input from '../dataNav/input.js';

class LocationNav extends Component {
  constructor() {
    super()


  }


  render() {
    const {locationInfo} = this.props;
    var seasons = Object.keys(this.props.locationInfo);
    var selectedSeason = seasons[0];
    if (this.props.season != null) {
      selectedSeason = this.props.season;
    }
    if(this.props.trailheads !== null){
      trailheads=trailheads
    }
    var trailheads = Object(this.props.locationInfo[selectedSeason]);
    var dates=[];

    Object.keys(trailheads).filter(key => { return key !== "key" }).forEach(key=>{
      dates = trailheads[key]
    }
  );


    return (
      <div className="locationData">
        <div className="dateTrailhead">
          Season:
          <select name="seasons" placeholder="Select a Season" value={selectedSeason} onChange={this.props.handleChange}>
          {
            seasons.filter(key => { return key !== "key" }).map(key=>{
              return <Dropdown key={key} index={key}
              />})
            }
          </select>
          Trailhead:
          <select name="trailheads" placeholder="Select a Trailhead" value={this.props.trailheads} onChange={this.props.handleChangeTrailhead}>
          {
            Object.keys(trailheads).filter(key => { return key !== "key" }).map(key=>{
              return <Dropdown key={key} index={key}
              />})
            }
          </select>
          Date:
          <select name ="dates" placeholder="Select a Date" value={this.props.date} onChange={this.props.handleChangeDay}>
            {
              Object.keys(dates).filter(key => { return key !== "key" }).map(key=>{
                return <DateDropdown key={key} index={key}
                />})
              }
          </select>
        </div>
      <div className="displaydata" ><LocationDisplay seasons={this.props.season} trailheads= {this.props.trailheads} day={this.props.date}/></div>
      <div><Input trailheads={this.props.trailheads} day={this.props.date} updateCountData={this.props.updateCountData}/></div>
      </div>
     )
  }
}

export default LocationNav
