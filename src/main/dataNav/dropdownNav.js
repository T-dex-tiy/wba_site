import React, { Component } from 'react';

class Dropdown extends Component {
  constructor(){
    super()
  }

  render() {
    const {locationInfo} = this.props;
    return (
        <option className="locationDropdown">
        {this.props.index}
        </option>
     )
  }
}

export default Dropdown;
