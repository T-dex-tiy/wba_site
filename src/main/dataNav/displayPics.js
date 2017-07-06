import React, { Component } from 'react';

class DisplayPic extends Component {
  constructor(){
    super()
  }

  render() {
    const {datedPics} = this.props;
    return (
        <div className="photo">
          <img className="renderedPics" src={datedPics.photo}/>
        </div>
     )
  }
}

export default DisplayPic
