import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('pacients');
  this.route('doctors');
  this.route('month-resume');
  this.route('consultation-list');
  this.route('consultation-list-date',{path:'consultation-list-date/year/:year/month/:month'});
});

export default Router;
