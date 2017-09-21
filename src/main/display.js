import React, { Component } from 'react';
import DisplayPic from './dataNav/displayPics.js';

class Display extends Component {
  constructor(){
    super()
  }
  console.log(this.props);
  render() {
    return (
      <div className="right-box">
        <div className="Pic">
          {
            Object
            .keys(this.props.displayPics)
            .map(key=>{
              return <DisplayPic key={key}
                index={key}
                datedPics={this.props.displayPics[key]}
                />})
          }
        </div>
      </div>
     )
  }
}

export default Display
