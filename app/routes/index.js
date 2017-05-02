import Ember from 'ember';

export default Ember.Route.extend({
    controllerName: 'index',
    init() {
        console.log('init')
    },
    willRender(){
        console.log('willRender')
    },
    model(){
        return {
            year:2017,
            month:1
        }
    }
});
