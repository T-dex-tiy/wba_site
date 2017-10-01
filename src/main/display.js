import React, { Component } from 'react';
import DisplayPic from './dataNav/displayPics.js';

class Display extends Component {
  constructor() {
    super();
  }
  render() {
    const observations = this.props.observations;
    const url = this.props.url;
    const show = this.props.show;
    if (observations != null) {
      return (
        <div className="right-box">
          <div className="Pic">
            {Object.keys(observations).map(key => {
              return (
                <DisplayPic
                  key={key}
                  index={key}
                  observation={observations[key]}
                  url={url}
                  show={show}
                />
              );
            })}
          </div>
        </div>
      );
    } else {
      return <div className="right-box" />;
    }
  }
}

export default Display;
