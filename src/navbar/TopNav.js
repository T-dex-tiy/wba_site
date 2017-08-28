import React, { Component } from 'react';
import Download from '../navbar/downloadbutton.js';



class TopNav extends Component {
  constructor(){
    super()
  }
  render() {
    return (
      <div className="bestberesourcefull">
        <Download />
      </div>

     )
  }
}

export default TopNav
