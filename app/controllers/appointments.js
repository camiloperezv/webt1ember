import Ember from 'ember';

export default Ember.Controller.extend({
    ajax: Ember.inject.service(),
    verFormulario:"block",
    direccion:null,
    fecha:null,
    hora:null,
    duracion:0,
    idPaciente:null,
//    events:Ember.A([{ title: 'Event 1', start: '2017-05-05T07:08:08', end: '2017-05-05T09:08:08' }, { title: 'Event 2', start: '2017-05-06T07:08:08', end: '2017-05-07T09:08:08' }, { title: 'Event 3', start: '2017-05-10T07:08:08', end: '2017-05-10T09:48:08' }, { title: 'Event 4', start: '2017-05-11T07:15:08', end: '2017-05-11T09:08:08' }]),
    citas:[],
    actualizarCalendario(){
        console.log("mierda");
    },
    actions:{
        actualizarCalendario(idPaciente){
            Ember.$("#calendar").fullCalendar('removeEvents');
            
            this.idPaciente=idPaciente;
            if(idPaciente==0){
                alert("debe seleccionar un paciente valido");
                return;
            }
            let that=this;
            return this.get('ajax').request('/api/v1/consultations').then(function(consultas){
                for(var i=0;i<consultas.length;i++){
                    let consulta = consultas[i];

                    if(consulta.pacient!=that.idPaciente)continue;

                    let horaFinal = parseInt(consulta.hour.substring(0, consulta.hour.indexOf(":")))+parseInt(consulta.duration);
                    horaFinal=(horaFinal>=10?horaFinal:"0"+horaFinal);
                    let mes =consulta.month;
                    if(mes<10)mes="0"+mes;

                    let dia=consulta.day;
                    if(dia<10)dia="0"+dia;

                    let fechaInicio=consulta.year+"-"+mes+"-"+dia+"T"+consulta.hour+":00";
                    let fechaFin=consulta.year+"-"+mes+"-"+dia+"T"+horaFinal+":00";
                    let evento = {"title":consulta.address, "start":fechaInicio, "end":fechaFin};
                    console.log(evento);
                    Ember.$("#calendar").fullCalendar('renderEvent', evento, true);
                }
            });
        },
        guardarCita(){
            if(!this.idPaciente){
                alert("Debe seleccionar un paciente para guardar la cita");
                return;
            }

            let fechaInicial=Ember.$("#fecha").val();

            if(!fechaInicial){
                alert("Debes ingresar la fecha y hora");
                return;
            }

            if(!this.direccion){
                alert("debes ingresar la dirección");
                return;
            }

            fechaInicial = fechaInicial.split("-").join("").split(":").join("").split(" ").join("");
            let year =fechaInicial.substring(0, 4);
            let mes =fechaInicial.substring(4, 6);
            let dia =fechaInicial.substring(6, 8);
            let hora =parseInt(fechaInicial.substring(8, 10));
            let minuto =fechaInicial.substring(10,12);
            let horaFinal=hora+parseInt(this.duracion);
            hora=(hora>=10?hora:"0"+hora);

            if(horaFinal>=24){
                alert("La cita no se puede extendar hasta el dia siguiente, debe disminuir la duración o la hora en la que la cita inicia");
                return;
            }

            horaFinal=(horaFinal>=10?horaFinal:"0"+horaFinal);

            let strFechaInicial = year+"-"+mes+"-"+dia+"T"+hora+":"+minuto+":00";
            let strFechaFinal = year+"-"+mes+"-"+dia+"T"+horaFinal+":"+minuto+":00";
            console.log(strFechaInicial);
            console.log(strFechaFinal);
            Ember.$("#calendar").fullCalendar('renderEvent', { title: this.direccion, start: strFechaInicial, end: strFechaFinal }, true);
            alert("cita guardada");
        },
        mostrarFormulario(){
            if(this.verFormulario=="block")this.set("verFormulario", "none");
            else this.set("verFormulario", "block");
        }
    }
});
