import React, { Component } from 'react';

class DateDrop extends Component {
  constructor(){
    super()
  }

  render() {
    return (
        <option className="locationDropdown" value= {this.props.index}>
          {this.props.index}
        </option>
     )
  }
}

export default DateDrop;
