import React, { Component } from 'react';

class LocationDropdown extends Component {
  constructor(){
    super()
  }

  render() {
    const {locationInfo} = this.props;
    return (
        <option className="locationDropdown">
        {Object.keys(locationInfo)}
        </option>
     )
  }
}

export default LocationDropdown;
