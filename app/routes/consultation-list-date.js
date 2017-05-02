import Ember from 'ember';

export default Ember.Route.extend({
  ajax: Ember.inject.service(),
  model(params) {
    let model = this.get('ajax').request('/api/v1/consultations/year/'+params.year+'/month/'+params.month);
    console.log('model',model);
    return model;
  },
});
