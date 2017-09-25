import React, { Component } from 'react';
import Dropdown from '../dataNav/dropdownNav.js';
import DateDropdown from '../dataNav/dateDropdown.js';
import LocationDropdown from '../dataNav/LocationDropdown.js';
import LocationDisplay from '../dataNav/locationDisplayData.js';
import Input from '../dataNav/input.js';

class LocationNav extends Component {
  constructor() {
    super();
    // We store dates in state here because we load the dates specific to a selected season and trailhead.
    this.state = {
      dates: null
    };
  }

  render() {
    var seasons = this.props.seasons;
    var trailheads = this.props.trailheads;
    var dates = this.props.dates;
    var selectedSeason = this.props.season;
    var selectedTrailhead = this.props.trailhead;
    var selectedDate = this.props.date;

    return (
      <div className="locationData">
        <div className="dateTrailhead">
          Season:
          <select
            name="seasons"
            placeholder="Select a Season"
            value={selectedSeason}
            onChange={this.props.handleChangeSeason}
          >
            [<Dropdown key="empty" index="Select a Season" />].concat({ seasons.map(key => {
                return <Dropdown key={key} index={key} />;
              })
            })
          </select>
          Trailhead:
          <select
            name="trailheads"
            placeholder="Select a Trailhead"
            value={selectedTrailhead}
            onChange={this.props.handleChangeTrailhead}
          >
            [<Dropdown key="empty" index="Select a Trailhead" />].concat({ trailheads.map(key => {
                return <Dropdown key={key} index={key} />;
              })
            })
          </select>
          Date:
          <select
            name="dates"
            placeholder="Select a Date"
            value={selectedDate}
            onChange={this.props.handleChangeDay}
          >
            [<DateDropdown key="empty" index="Select a Date" />].concat({ dates.map(key => {
              return <DateDropdown key={key} index={key} />;
            })
          })
          </select>
        </div>
        <div className="displaydata">
          <LocationDisplay
            seasons={this.props.season}
            trailhead={this.props.trailhead}
            day={this.props.date}
          />
        </div>
        <div>
          <Input
            trailhead={this.props.trailhead}
            day={this.props.date}
            updateCountData={this.props.updateCountData}
          />
        </div>
      </div>
    );
  }
}

export default LocationNav;
