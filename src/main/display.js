import React, { Component } from 'react';
import DisplayPic from './dataNav/displayPics.js';
import Notifications, {notify} from 'react-notify-toast';
import EventListener, {withOptions} from 'react-event-listener';

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counterValue: props.counterValue || 0
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.zero = this.zero.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  increment() {
    let counterValue = this.state.counterValue + 1;
    this.setState({
      counterValue: counterValue
    });
    notify.show(counterValue, 'success', 500);
  }
  decrement() {
    let counterValue = Math.max(0, this.state.counterValue - 1);
    this.setState({
      counterValue: counterValue
    });
    notify.show(counterValue, 'success', 500);
  }
  zero() {
    this.setState({
      counterValue: 0
    });
    notify.show('Reset!', 'warning', 1000);
  }
  handleKeyDown(event) {
    if (event.keyCode == 189) {
      this.decrement();
    } else if (event.keyCode == 187) {
      this.increment();
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      counterValue: parseInt(nextProps.counterValue)
    });
  }
  render() {
    const observations = this.props.observations;
    const url = this.props.url;
    const show = this.props.show;
    const counterValue = this.state.counterValue;
    if (observations != null) {
      return (
        <div className="right-box">
            <EventListener target={document} onKeyDown={this.handleKeyDown} />
            <div className="counter-input">
              <span className="observations">
                Observations: {observations.length}
              </span>
              <span className="counter-wrapper">
                <span className="counter">
                  Counter: {counterValue}
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
