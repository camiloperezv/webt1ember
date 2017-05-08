import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('appointments');
  this.route('pacients');
  this.route('doctors');
  this.route('month-resume');
  this.route('consultation-list');
  this.route('consultation-list-date',{path:'consultation-list-date/year/:year/month/:month'});
  this.route('doctors.schedule', {path:"/doctors/schedule/:doctor_id"});
  this.route('consultation', {path:'consultation/:id'});
});

export default Router;
