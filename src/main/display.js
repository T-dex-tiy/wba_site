import React, { Component } from 'react';
import DisplayPic from './dataNav/displayPics.js';

class Display extends Component {
  constructor(){
    super()
  }
  render() {
    const season = this.props.season;
    const trailhead = this.props.trailhead;
    const date = this.props.date;
    var observations = [];
    if (season != null && this.props.displayPics[season] != null && trailhead != null && this.props.displayPics[season][trailhead] != null && date != null) {
      observations = this.props.displayPics[season][trailhead][date]
    }
    if (observations != null) {
      return (
        <div className="right-box">
          <div className="Pic">
          {
            Object
            .keys(observations)
            .map(key=>{
              return <DisplayPic key={key}
                index={key}
                datedPics={observations[key]}
                />})
          }
          </div>
        </div>
       )
     } else {
       return (
         <div className="right-box">
         </div>
       )
     }
  }
}

export default Display
