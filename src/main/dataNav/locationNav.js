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
    var seasons = Object.keys(locationInfo);
    var trailheads = [];
    var dates = [];
    var selectedSeason = seasons[0];
    var selectedTrailhead = null;
    var selectedDate = null;

    if (this.props.season != null) {
      selectedSeason = this.props.season;
    }

    if (locationInfo[selectedSeason]) {
      selectedTrailhead = Object.keys(locationInfo[selectedSeason]).filter(key => { return key !== "key" })[0];
    }

    if (this.props.trailhead != null) {
      selectedTrailhead = this.props.trailhead
    }

    if (selectedSeason) {
      trailheads = Object.keys(locationInfo[selectedSeason]);
      console.log("figuring this out", locationInfo[selectedSeason][selectedTrailhead]);
      if (locationInfo[selectedSeason][selectedTrailhead]!=null){
        if (selectedTrailhead) {
          Object.keys(locationInfo[selectedSeason][selectedTrailhead]).filter(key => { return key !== "key" }).forEach(key => {
            dates.push(key);
          });
      }
    }
    }

    return (
      <div className="locationData">
        <div className="dateTrailhead">
          Season:
          <select name="seasons" placeholder="Select a Season" value={selectedSeason} onChange={this.props.handleChangeSeason}>
          {
            seasons.filter(key => { return key !== "key" }).map(key=>{
              return <Dropdown key={key} index={key}
              />})
            }
          </select>
          Trailhead:
          <select name="trailheads" placeholder="Select a Trailhead" value={this.props.trailhead} onChange={this.props.handleChangeTrailhead}>
          {
            trailheads.filter(key => { return key !== "key" }).map(key=>{
              return <Dropdown key={key} index={key}
              />})
            }
          </select>
          Date:
          <select name ="dates" placeholder="Select a Date" value={this.props.date} onChange={this.props.handleChangeDay}>
            {
              dates.map(key=>{
                return <DateDropdown key={key} index={key}
                />})
              }
          </select>
        </div>
      <div className="displaydata" ><LocationDisplay seasons={this.props.season} trailhead={this.props.trailhead} day={this.props.date}/></div>
      <div><Input trailheads={this.props.trailhead} day={this.props.date} updateCountData={this.props.updateCountData}/></div>
      </div>
     )
  }
}

export default LocationNav
