import React, { Component } from 'react';
import Dropdown from '../dataNav/dropdownNav.js';

class LocationNav extends Component {
  constructor(){
    super()
  }

  render() {
    const {locationInfo} = this.props;
    return (
      <div>
      <select id="dataSet">
      {
        Object
        .keys(this.props.locationInfo)
        .map(key=>{
          return <Dropdown key={key} index={key} locationInfo={this.props.locationInfo[key]}
          />})
        }
      </select>
      </div>
     )
  }
}

export default LocationNav
