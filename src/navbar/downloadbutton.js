import React, { Component } from 'react';
import Database from '../Database.js';

class Download extends Component {
  constructor(){
    super()
    this.export = this.export.bind(this);
  }

  export() {
    Database.sharedInstance.export();
  }

  render() {
    return (
      <div className="bestberesourcefull">
        <button onClick={this.export}>Export Count Data</button>
      </div>
    )
  }
}

export default Download
