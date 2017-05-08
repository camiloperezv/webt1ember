import Ember from 'ember';

export default Ember.Route.extend({
  ajax: Ember.inject.service(),
  model(params) {
    let model = this.get('ajax').request('/api/v1/consultations/id/'+params.id);
    console.log(model)
    return model

 }
});
