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
    this.state = {
      url: null
    };
  }

  componentDidMount() {
    dbx
      .sharingCreateSharedLink({ path: this.props.observation.path })
      .then(function(response) {
        this.setState({ url: response.url.replace('?dl=0', '?raw=1') });
      }.bind(this))
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    if (this.state.url == null) {
      return (
        <div>...</div>
      );
    } else {
      return (
        <div className="photo">
          <div>
            <img className="renderedPics" src={this.state.url} />
          </div>
        </div>
      );
    }
  }
}

export default DisplayPic;
