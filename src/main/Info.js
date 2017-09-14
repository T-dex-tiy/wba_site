import React, { Component } from 'react';
import LocationNav from './dataNav/locationNav.js';

class Info extends Component {
  constructor(){
    super()
  }
  render() {
    return (
      <div className="left-box locationData">
           <LocationNav locationInfo={this.props.displayLocation}
              />
      </div>
     )
  }
}

export default Info
