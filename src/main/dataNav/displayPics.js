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

  render() {
    return (
      <div className="photo">
        <div>
          <img className="renderedPics" src={this.props.url} />
          <input type="checkbox" show={this.props.show} />
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
