import React, { Component } from 'react';
import DisplayPic from './dataNav/displayPics.js';

class Display extends Component {
  constructor(){
    super()
  }
  render() {
    return (
      <div className="right-box">
        <div className="Pic">
          <DisplayPic/>
        </div>
      </div>
     )
  }
}

export default Display
