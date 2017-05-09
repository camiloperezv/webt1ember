import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
    ajax: Ember.inject.service(),
    model() {
        let that=this;
        return new RSVP.Promise(function(resolve) {
            return that.get('ajax').request('/api/v1/pacients').then(function(pacients){
                that.get('ajax').request('/api/v1/doctors').then(function(doctors){
                   resolve({doctors:doctors, pacients:pacients});
                });
            });
        });
    }
});
