import React, { Component } from 'react';

class LocationNav extends Component {
  constructor(){
    super()
  }

  render() {
    const {locationInfo} = this.props;
    return (
        <option className="locationDropdown">
        {locationInfo.location + ' '+ locationInfo.date}
        </option>
     )
  }
}

export default LocationNav
