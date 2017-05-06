import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
    ajax: Ember.inject.service(),
    doctor:{},
    model(params){
        let that=this;
        return new RSVP.Promise(function(resolve) {
            that.get('ajax').request('/api/v1/doctors').then(function(data){
                let doctors=data;
                console.log(data);
                for(var i=0;i<doctors.length;i++){
                    if(doctors[i].docId==params.doctor_id)
                        that.doctor=doctors[i];
                    }

                resolve(that.doctor);
            });
        });
    },
    actions:{
        fijarHorario(){
            alert("guardado exitoso"+this.doctor.init);
        }
    }
});
