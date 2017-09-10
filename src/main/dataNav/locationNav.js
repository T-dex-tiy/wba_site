import React, { Component } from 'react';
import Dropdown from '../dataNav/dropdownNav.js';
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
      <select name="trailheads" onChange={this.handleChange}>
      {
        Object.keys(trailheads).filter(key => { return key != "key" }).map(key=>{
          return <Dropdown key={key} index={key}

          />})
        }
      </select>
      </div>
     )
  }
}

export default LocationNav
