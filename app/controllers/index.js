import Ember from 'ember';

export default Ember.Controller.extend({
    actions:{
        goToConsultationsByDate(){
            let month = this.get('month') || 1;
            let year = this.get('year') || 2017;
            this.set('year',undefined);
            this.set('month',undefined);
            this.transitionToRoute('consultation-list-date',year,month)
        },
        updateYear(year){
            this.set('year',year)
        },
        updateMonth(month){
            this.set('month',month)
        }
    }
});
