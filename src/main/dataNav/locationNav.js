import React, { Component } from 'react';
import Dropdown from '../dataNav/dropdownNav.js';
import DateDropdown from '../dataNav/dateDropdown.js';
import LocationDropdown from '../dataNav/LocationDropdown.js';

class LocationNav extends Component {
  constructor() {
    super()
    this.state = { season: null };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if (event.target.name != "seasons") {
      return;
    }
    var value = event.target.value;
    this.setState({ season: value });
  }

  //if statement goes here for rendering second dropdown select


  //Leads into second map feature and new dropdown so Componentshouldmount()

  render() {
    const {locationInfo} = this.props;
    var seasons = Object.keys(this.props.locationInfo);
    var selectedSeason = seasons[0];
    if (this.state.season != null) {
      selectedSeason = this.state.season;
    }
    var trailheads = Object(this.props.locationInfo[selectedSeason]);
    var dates=[];
    var displayDate=Object.keys(dates);

    Object.keys(trailheads).forEach(key=>{
      console.log(key);
      console.log(trailheads[key]);
      dates.push(trailheads[key])
    }
  );





    console.log("dates",dates);
    console.log("Seasons", seasons);
    console.log("displayDate",displayDate);
    console.log("trailheads", trailheads);
    return (
      <div>
      Season:
      <select name="seasons" value={selectedSeason} onChange={this.handleChange}>
      {
        seasons.filter(key => { return key != "key" }).map(key=>{
          return <Dropdown key={key} index={key} locationInfo={Object.keys(locationInfo)}
          />})
        }
      </select>
      Trailhead:
      <select name="trailheads" value={trailheads} onChange={this.handleChange}>
      {
        Object.keys(trailheads).filter(key => { return key != "key" }).map(key=>{
          return <Dropdown key={key} index={key}
          />})
        }
      </select>
      Date:
      <select name ="dates"onChange={this.handleChange} >
      {
        dates.map(key=>{
          return <DateDropdown key={key} index ={key} />
        })
      }

      </select>
      </div>
     )
  }
}

export default LocationNav
