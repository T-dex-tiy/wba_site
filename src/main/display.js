import React, { Component } from 'react';
import DisplayPic from './dataNav/displayPics.js';

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: this.props.number || 0
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.zero = this.zero.bind(this);
  }
  increment() {
    this.setState({
      number: this.state.number + 1
    });
  }
  decrement() {
    this.setState({
      number: Math.max(0, this.state.number - 1)
    });
  }
  zero() {
    this.setState({
      number: 0
    });
  }
  render() {
    const observations = this.props.observations;
    const url = this.props.url;
    const show = this.props.show;
    if (observations != null) {
      return (
        <div className="right-box">
            <div className="counter-input">
              <span className="observations">
                Observations: {observations.length}
              </span>
              <span className="counter-wrapper">
                <span className="counter">
                  Counter: {this.state.number}
                </span>
                <span className="counter-buttons">
                  <button className="counter-button" onClick={this.decrement}>-</button>
                  <button className="counter-button" onClick={this.increment}>+</button>
                  <button className="counter-button" onClick={this.zero}>Reset</button>
                </span>
              </span>
            </div>
            <div className="Pic">
              {Object.keys(observations).map(key => {
                return (
                  <DisplayPic
                    key={key}
                    index={key}
                    observation={observations[key]}
                    url={url}
                    show={show}
                    showPhoto={this.props.showPhoto.bind(this)}
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
