import React, { Component } from 'react';

class Dropdown extends Component {
  constructor(){
    super()
  }

  render() {
    const {locationInfo} = this.props;
    return (
        <option className="locationDropdown">
        {locationInfo[0]}
        </option>
     )
  }
}

export default Dropdown;
