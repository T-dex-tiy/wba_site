import React, { Component } from 'react';
import Download from '../navbar/downloadbutton.js';
import Logout from '../navbar/logOut.js';


class TopNav extends Component {
  constructor(){
    super()
  }
  render() {
    return (
      <div className="bestberesourcefull">
        <p>test</p>
        <Logout />
        <Download />

      </div>

     )
  }
}

export default TopNav
