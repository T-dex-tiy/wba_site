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
          <select id="dataSet">
          {
            Object.keys(this.props.displayLocation).map(key=>{
              return <LocationNav key={key} index={key} locationInfo={this.props.displayLocation[key]}
              />})
            }
          </select>
        </div>
      </div>
     )
  }
}

export default Info
