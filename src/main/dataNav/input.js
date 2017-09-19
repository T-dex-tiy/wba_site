import React, { Component } from 'react';

class Input extends Component {
  constructor(){
    super()
    this.addData = this.addData.bind(this)
  }

  addData(event){
    const newCourseData={
      date:this.refs.date.value,
      trailheads:this.refs.trailheadData.value,
      Vistors:this.refs.vistorCount.value,
    }
    event.preventDefault();

  this.props.updateCountData(newCourseData)
  }

  render() {

    return (
      <div className= "inputData dateTrailhead">
        <div><h4>Date</h4><input type="text" ref="date"value={this.props.day}></input></div>
        <div><h4>Location</h4><input type="text" ref="trailheadData" value={this.props.trailheads}></input></div>
        <div><h4>Unique Vistors</h4><input type="text" ref="vistorCount"/></div>
        <div className= "btn"><button className= "button" onClick={this.addData}>Submit</button></div>
      </div>
     )
  }
}

export default Input;
