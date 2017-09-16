import React, { Component } from 'react';
import Dropdown from '../dataNav/dropdownNav.js';
import DateDropdown from '../dataNav/dateDropdown.js';
import LocationDropdown from '../dataNav/LocationDropdown.js';
import LocationDisplay from '../dataNav/locationDisplayData.js';
import Input from '../dataNav/input.js';

class LocationNav extends Component {
  constructor() {
    super()
    this.state = {
      season: null,
      trailheads: null,
      date:null,
     };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeTrailhead = this.handleChangeTrailhead.bind(this);
    this.handleChangeDay = this.handleChangeDay.bind(this);
  }

  handleChange(event) {
    if (event.target.name !== "seasons") {
      return;
    }
    var seasonValue = event.target.value;
    this.setState({
       season: seasonValue,
      });
  }
  handleChangeTrailhead(event) {
    if (event.target.name !== "trailheads") {
      return;
    }
    var trailheadValues = event.target.value;
    console.log(trailheadValues);
    this.setState({
       trailheads: trailheadValues,
      });
  }

  handleChangeDay(event) {
    if (event.target.name !== "dates") {
      return;
    }
    var dateValue = event.target.value;
    console.log(dateValue);
    this.setState({
       date: dateValue,
      });
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
    if(this.state.trailheads !== null){
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
          <select name="seasons" value={selectedSeason} onChange={this.handleChange}>
          {
            seasons.filter(key => { return key !== "key" }).map(key=>{
              return <Dropdown key={key} index={key}
              />})
            }
          </select>
          Trailhead:
          <select name="trailheads" value={trailheads} onChange={this.handleChangeTrailhead}>
          {
            Object.keys(trailheads).filter(key => { return key !== "key" }).map(key=>{
              return <Dropdown key={key} index={key}
              />})
            }
          </select>
          Date:
          <select name ="dates" value={dates} onChange={this.handleChangeDay}>
            {
              Object.keys(dates).filter(key => { return key !== "key" }).map(key=>{
                return <DateDropdown key={key} index={key}
                />})
              }
          </select>
        </div>
      <div className="displaydata" ><LocationDisplay seasons={this.state.season} trailheads= {this.state.trailheads} day={this.state.date}/></div>
      <div><Input/></div>
      </div>
     )
  }
}

export default LocationNav
