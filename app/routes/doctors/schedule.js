import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
    ajax: Ember.inject.service(),
    doctor:{},
    init(){
        console.log("mierda");
    },
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
            let that=this;
            if(!this.doctor.init.match(/^\d\d[:]\d\d$/g)){
                alert("La hora de entrada no es valida");
                return;
            }

            if(!this.doctor.end.match(/^\d\d[:]\d\d$/g)){
                alert("La hora de salida no es valida");
                return;
            }

            this.get("ajax").request("/api/v1/doctors/hours",{method: 'PUT',data: {"doctorId":this.doctor.docId, "init":this.doctor.init, "end":this.doctor.end}}).then(function(respuesta){
                alert("guardado exitoso");
                that.transitionTo('doctors');
            });
        }
    }
});
