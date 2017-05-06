import Ember from 'ember';

export default Ember.Controller.extend({
    events:Ember.A([{ title: 'Event 1', start: '2017-05-05T07:08:08', end: '2017-05-05T09:08:08' }, { title: 'Event 2', start: '2017-05-06T07:08:08', end: '2017-05-07T09:08:08' }, { title: 'Event 3', start: '2017-05-10T07:08:08', end: '2017-05-10T09:48:08' }, { title: 'Event 4', start: '2017-05-11T07:15:08', end: '2017-05-11T09:08:08' }]),
    actions:{
        actualizarCalendario(){

        }
    }
});
