import Ember from 'ember';

export default Ember.Controller.extend({
  init() {
    let model = this.get('ajax').request('/api/v1/consultations').then((response)=>{
      console.log(response);
      this.set('consultations',response.filterBy('ended', false))
    });
  },
  ajax: Ember.inject.service(),

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
    },
    goToHistoryBypacient(){
      let id = this.get('id') || 123123;
      this.set('id',undefined);
      this.transitionToRoute('history-pacient',id)
    },
    goToConsultation(id){
      this.transitionToRoute('consultation',id-1)
    }
  }
});
