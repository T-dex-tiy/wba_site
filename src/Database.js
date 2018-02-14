import firebase from 'firebase';
import Rebase from 're-base';
import Notifications, {notify} from 'react-notify-toast';
import React, { Component } from 'react';

export default class Database {
  static sharedInstance = this.sharedInstance == null ? new Database() : this.sharedInstance

  constructor() {
    const app = firebase.initializeApp({
      apiKey: 'AIzaSyCQXJ-iCdvSjz7DUzDn8G6xl6LNO58HV8E',
      authDomain: 'wba-trail-counting.firebaseapp.com',
      databaseURL: 'https://wba-trail-counting.firebaseio.com',
      storageBucket: 'wba-trail-counting.appspot.com'
    });
    this.firebase = Rebase.createClass(app.database());
    this.export = this.export.bind(this);
  }

  export() {
    notify.show('Exporting data...', 'success', -1);
    this.firebase.fetch('observations',
      {
        context: this,
        then(observations) {
          this.firebase.fetch('countData',
            {
              context: this,
              then(data) {
                var csv = 'season,trailhead,date,counter,observations,users\n';
                var totals = {};
                for (var key in data) {
                  var row = data[key];
                  var observationKey = [row['season'], row['trailhead'], row['date']].join('-');
                  var observationsCount = 0;
                  var observationsForKey = observations[observationKey];
                  if (observationsForKey !== undefined) {
                    var times = observationsForKey['times'];
                    if (times !== undefined) {
                      observationsCount = times.length;
                    }
                  }
                  csv += row['season'] + ',' + row['trailhead'] + ',' + row['date'] + ',' + row['user'] + ',' + observationsCount + ',' + row['visitors'] + '\n';
                  var season = totals[row['season']];
                  if (season == null) {
                    season = { 'trailheads': {}, 'totalVisitors': 0, 'totalObservations': 0 }
                  }
                  var trailhead = season['trailheads'][row['trailhead']]
                  if (trailhead == null) {
                    trailhead = { 'totalVisitors': 0, 'totalObservations': 0 }
                  }
                  var count = parseInt(row['visitors']);
                  season['totalVisitors'] += count;
                  season['totalObservations'] += observationsCount;
                  trailhead['totalVisitors'] += count
                  trailhead['totalObservations'] += observationsCount;
                  season['trailheads'][row['trailhead']] = trailhead
                  totals[row['season']] = season
                }
                csv += '\n\nTotals,season,trailhead,observations,users\n';
                for (var s in totals) {
                  var season = totals[s];
                  for (var t in season['trailheads']) {
                    var trailhead = season['trailheads'][t];
                    csv += 'Total,' + s + ',' + t + ',' + trailhead['totalObservations'] + ',' + trailhead['totalVisitors'] + '\n';
                  }
                  csv += 'Total,' + s + ',,' + season['totalObservations'] + ',' + season['totalVisitors'] + '\n';
                }
                var uncountedDates = [];
                for (var key in observations) {
                  var row = observations[key];
                  var countKey = [row['season'], row['trailhead'], row['date']].join('-');
                  var countData = data[countKey];
                  console.log(JSON.stringify(countData));
                  if (countData !== undefined) {
                    continue;
                  }
                  uncountedDates.push([row['season'], row['trailhead'], row['date']].join(','));
                }
                csv += '\n\nUncounted dates\n';
                csv += uncountedDates.join('\n');
                var blob = new Blob([csv], { type: 'text/csv' });
                var anchor = document.createElement('a');
                anchor.href = window.URL.createObjectURL(blob);
                anchor.setAttribute('download', 'wba-count-data.csv');
                anchor.click();
                if (document.getElementsByClassName('toast-notification').length > 0) {
                  var notifyNode = document.getElementsByClassName('toast-notification')[0];
                  notifyNode.style.visibility = "hidden";
                  console.log(notifyNode);
                }
              }
            }
          );
        }
      }
    );
  }
}
