import Ember from 'ember';

export default Ember.Controller.extend({
  ajax: Ember.inject.service(),
  actions:{
    toggleBody(pacient) {
      let model1 = this.get('ajax').request('/api/v1/pacients/history/'+pacient).then((response)=>{
        this.set('historys',response.history)
        this.toggleProperty('isShowingBody');
      });

    },
    submitHistory: function(id) {

      if(!this.diagnostic){
          alert("Debes ingresar el diagnostico");
          return;
      }

      if(!this.medicine){
          alert("debes ingresar la medicina");
          return;
      }

      var response = this.get('ajax').request('/api/v1/consultations/end', {
        method: 'PUT',
        data: { consultationId: idConsultation, history: {diagnostic: this.get('diagnostic'), medicine: this.get('medicine')} }
      });
      console.log(response)
      this.set('diagnostic', '');
      this.set('medicine', '');
      this.transitionToRoute('index');
      return response
    }
  }
});
