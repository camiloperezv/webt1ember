import Ember from 'ember';
export default Ember.Route.extend({
  ajax: Ember.inject.service(),
  model() {
    var model =  this.get('ajax').request('/api/v1/consultations/history');
    return model;
  }
});
