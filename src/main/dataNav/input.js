import React, { Component } from 'react';

class Input extends Component {
  constructor(){
    super()
  }

  render() {

    return (
      <div className= "inputData dateTrailhead">
        <div><h4>Date</h4><input type="text"/></div>
        <div><h4>Location</h4><input type="text"/></div>
        <div><h4>Unique Vistors</h4><input type="text"/></div>
      </div>
     )
  }
}

export default Input;
