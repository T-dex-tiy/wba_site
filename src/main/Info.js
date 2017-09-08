import React, { Component } from 'react';
import LocationNav from './dataNav/locationNav.js';

class Info extends Component {
  constructor(){
    super()
  }
  render() {
    return (
      <div className="left-box">
        <div className="loactionData">
           <LocationNav locationInfo={this.props.displayLocation}
              />
        </div>
      </div>
     )
  }
}

export default Info
