import React, { Component } from 'react';
import Dropdown from '../dataNav/dropdownNav.js';
import DateDropdown from '../dataNav/dateDropdown.js';
import LocationDropdown from '../dataNav/LocationDropdown.js';
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
    if (selectedSeason == null) {
      selectedSeason = "";
    }
    var selectedTrailhead = this.props.trailhead;
    if (selectedTrailhead == null) {
      selectedTrailhead = "";
    }
    var selectedDate = this.props.date;
    if (selectedDate == null) {
      selectedDate = "";
    }

    return (
      <div className="locationData">
        <div>
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
            [<Dropdown key="empty" index="Select a Trailhead" />].concat({ trailheads.sort().map(key => {
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
        <div>
          <Input
            season={this.props.season}
            trailhead={this.props.trailhead ? this.props.trailhead : ""}
            date={this.props.date ? this.props.date : ""}
            dateCountData={this.props.dateCountData ? this.props.dateCountData : {}}
            updateCountData={this.props.updateCountData ? this.props.updateCountData : {}}
          />
        </div>
      </div>
    );
  }
}

export default LocationNav;
