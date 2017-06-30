import React, { Component } from 'react';

class LocationNav extends Component {
  constructor(){
    super()
  }
  render() {
    const {locationInfo}= this.props;
    return (
      <div className="right-box">
        <option className="locationDropdown">
        {locationInfo.date}
        </option>
      </div>
     )
  }
}

export default LocationNav
