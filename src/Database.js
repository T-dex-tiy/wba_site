import firebase from 'firebase';
import Rebase from 're-base';

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
    this.firebase.fetch('countData',
      {
        context: this,
        then(data) {
          var csv = 'season,trailhead,date,user,count\n';
          var totals = {};
          for (var key in data) {
            var row = data[key];
            csv += row['season'] + ',' + row['trailhead'] + ',' + row['date'] + ',' + row['user'] + ',' + row['visitors'] + '\n';
            var season = totals[row['season']];
            if (season == null) {
              season = { 'trailheads': {}, 'total': 0 }
            }
            var trailhead = season['trailheads'][row['trailhead']]
            if (trailhead == null) {
              trailhead = 0
            }
            var count = parseInt(row['visitors']);
            season['total'] += count;
            trailhead += count
            season['trailheads'][row['trailhead']] = trailhead
            totals[row['season']] = season
          }
          csv += '\n\n';
          for (var s in totals) {
            var season = totals[s];
            for (var t in season['trailheads']) {
              var trailhead = season['trailheads'][t];
              csv += 'Total,' + s + ',' + t + ',' + trailhead + '\n';
            }
            csv += 'Total,' + s + ',,' + season['total'] + '\n';
          }
          var blob = new Blob([csv], { type: 'text/csv' });
          var anchor = document.createElement('a');
          anchor.href = window.URL.createObjectURL(blob);
          anchor.setAttribute('download', 'wba-count-data.csv');
          anchor.click();
        }
      }
    );
  }
}
