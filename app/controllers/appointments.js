import Ember from 'ember';

export default Ember.Controller.extend({
    ajax: Ember.inject.service(),
    verFormulario:"none",
    events:Ember.A([
        { title: 'Event 1', start: '2017-05-05T07:08:08', end: '2017-05-05T09:08:08' }, 
        { title: 'Event 2', start: '2017-05-06T07:08:08', end: '2017-05-07T09:08:08' }, 
        { title: 'Event 3', start: '2017-05-10T07:08:08', end: '2017-05-10T09:48:08' }, 
        { title: 'Event 4', start: '2017-05-11T07:15:08', end: '2017-05-11T09:08:08' }]),
    actualizarCalendario(){
        console.log("mierda");
    },
    actions:{
        actualizarCalendario(idPaciente){
            if(idPaciente==0){
                alert("debe seleccionar un paciente valido");
                return;
            }
            let that=this;
            return this.get('ajax').request('/api/v1/consultations').then(function(consultas){
                that.eventos = [];
                for(var i=0;i<consultas.length;i++){
                    let consulta = consultas[i];
                    let fechaInicio=consulta.year+"-"+consulta.month+"-"+consulta.day+"T"+consulta.hour+":00";

                    let horaFinal = parseInt(consulta.hour.substring(0, consulta.hour.indexOf(":")))+parseInt(consulta.duration);

                    let fechaFin=consulta.year+"-"+consulta.month+"-"+consulta.day+"T"+horaFinal+":00";
                    that.eventos.push({"title":consulta.address, "start":fechaInicio, "end":fechaFin});
                }
                that.set("eventos", Ember.A([{ title: 'Event 1', start: '2017-05-05T07:08:08', end: '2017-05-05T09:08:08' }]));
                console.log("estos son los eventos");
                console.log(that.eventos);
            });
        },
        guardarCita(){
            Ember.$("#calendar").fullCalendar('renderEvent', { title: 'Event 8', start: '2017-05-01T07:15:08', end: '2017-05-01T09:08:08' }, true);
            console.log("cita guardada");
        },
        mostrarFormulario(){
            if(this.verFormulario=="block")this.set("verFormulario", "none");
            else this.set("verFormulario", "block");
        }
    }
});
