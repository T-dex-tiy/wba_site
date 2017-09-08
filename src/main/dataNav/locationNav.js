import React, { Component } from 'react';
import Dropdown from '../dataNav/dropdownNav.js';

class LocationNav extends Component {
  constructor(){
    super()
  }

  //if statement goes here for rendering second dropdown select


  //Leads into second map feature and new dropdown so Componentshouldmount()

  render() {
    const {locationInfo} = this.props;
    return (
      <div>
      <select id="dataSet">
      {
        Object
        .keys(this.props.locationInfo)
        .map(key=>{
          return <Dropdown key={key} index={key} locationInfo={Object.keys(locationInfo)}
          />})
        }
      </select>
      </div>
     )
  }
}

export default LocationNav
