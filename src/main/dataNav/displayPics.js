import React, { Component } from 'react';

class DisplayPic extends Component {
  constructor(){
    super()
  }

  render() {
    const {datedPics} = this.props;
    return (
        <div className="photo">
          <div>
          <img className="renderedPics" src={datedPics.photo}/>
          </div>
        </div>
     )
  }
}

export default DisplayPic
