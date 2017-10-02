import React, { Component } from 'react';
import dropbox from 'dropbox';

var Dropbox = require('dropbox');
var dbx = new Dropbox({
  accessToken:
    'dLZ2mHAXz3AAAAAAAAR9QCBlO4f8uS2Jm2ZHm2udxP6HPUt6s4S87a3Eox2ERHrr'
});

class DisplayPic extends Component {
  constructor() {
    super();
    this.display = this.display.bind(this);
  }

  componentDidMount() {
    var displayPic = this;
    dbx
      .sharingCreateSharedLink({ path: this.props.observation.path })
      .then(function(response) {
        displayPic.setState({ url: response.url.replace('?dl=0', '?dl=1') });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  display(event) {
    console.log(this.props.index, 'is clicked');
    console.log(this.defaultValue, 'test');
    console.log(this.value, 'val');
  }

  render() {
    return (
      <div className="photo">
        <div>
          <img className="renderedPics" src={this.props.url} />
          <input
            type="checkbox"
            value="display"
            onChange={this.display}
            name="show"
          />
          <label>Has been counted?</label>
        </div>
        <div>
          <img className="gallery" />
        </div>
      </div>
    );
  }
}

export default DisplayPic;
