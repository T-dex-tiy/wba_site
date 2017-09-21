import React, { Component } from 'react';
import DisplayPic from './dataNav/displayPics.js';

class Display extends Component {
  constructor(){
    super()
  }
  render() {
    const season = this.props.season
    const trailhead = this.props.trailhead
    const date = this.props.date
    if (season != null && trailhead != null) {// && date != null && this.props.displayPics[season][trailhead][date] != null) {
      console.log("date: " + date + ", object: " + JSON.stringify(this.props.displayPics[season][trailhead][date]));
      return (
        <div className="right-box">
          <div className="Pic">
          {
            Object
            .keys(this.props.displayPics[season][trailhead][date])
            .map(key=>{
              return <DisplayPic key={key}
                index={key}
                datedPics={this.props.displayPics[key]}
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
