/* eslint-env node */

// To use it create some files under `mocks/`
// e.g. `server/mocks/ember-hamsters.js`
//
// module.exports = function(app) {
//   app.get('/ember-hamsters', function(req, res) {
//     res.send('hello');
//   });
// };
const bodyParser = require('body-parser');
var doctors = [
  {
    name: 'Pedro',
    lastName: 'Velez',
    address: 'Medellin 123',
    job: 'Doctor',
    init: '10:01',
    end: '19:03',
    gender: 'M',
    birthday: '5/11/1984',
    phone: 987654,
    docId: 45678734
  },
  {
    name: 'Maria',
    lastName: 'Rojas',
    address: 'Medellin 12223',
    job: 'Doctor',
    init: '10:01',
    end: '19:00',
    gender: 'F',
    birthday: '5/10/1974',
    phone: 98764,
    docId: 478734
  },
  {
    name: 'Victor',
    lastName: 'Lopera',
    address: 'Sabaneta 12223',
    job: 'Doctor',
    init: '10:00',
    end: '19:00',
    gender: 'M',
    birthday: '15/1/1974',
    phone: 98132764,
    docId: 657465463
  },
  {
    name: 'Clara',
    lastName: 'Corrales',
    address: 'Envigado 12223',
    job: 'Doctor',
    init: '10:00',
    end: '19:00',
    gender: 'F',
    birthday: '1/5/1994',
    phone: 98132764,
    docId: 6565463
  },
]
var pacients = [
  {
    name: 'Camilo',
    lastName: 'Perez',
    address: 'Caldas 123',
    job: 'Estudiante',
    gender: 'M',
    birthday: '5/11/1994',
    phone: 13231231,
    docId: 123123199
  },
  {
    name: 'Margarita',
    lastName: 'Velez',
    address: 'Itagüi',
    job: 'Estudiante',
    gender: 'F',
    birthday: '5/1/1954',
    phone: 123133,
    docId: 123123
  },
  {
    name: 'Rosa',
    lastName: 'Montes',
    address: 'Itagüi',
    job: 'pencionada',
    gender: 'F',
    birthday: '5/1/1964',
    phone: 123133,
    docId: 12312399
  }
];
var medicInfo = {
  12312399:{
    history:[
      {
        date:1493350148186,
          diagnostic:'Gengibitis',
        medicine:'Limpieza bucal',
        doctor:478734
      },
      {
        date:1493350148186,
        diagnostic:'Desalineamiento de los dientes',
        medicine:'Frenillos',
        doctor:478734
      },
      {
        date:1493350148186,
        diagnostic:'Caries',
        medicine:'Extirpación del area afectada',
        doctor:478734
      }
    ]
  },
  123123:{
    history:[
      {
        date:1493350148186,
        diagnostic:'Desalineamiento de los dientes',
        medicine:'Frenillos',
        doctor:657465463
      },
      {
        date:1493350148186,
        diagnostic:'Dolor agudo de muelas',
        medicine:'Calamantes y extirpación de muelas comprometidas',
        doctor:657465463
      },
      {
        date:1493350148186,
        diagnostic:'Caries',
        medicine:'Extirpación del area afectada',
        doctor:478734
      }
    ]
  },
  123123199:{
    history:[
      {
        date:1493350148186,
        diagnostic:'Desalineamiento de los colmillos',
        medicine:'Realineamiento por medio de cauchos',
        doctor:657465463
      },
      {
        date:1493350148186,
        diagnostic:'Gengibitis',
        medicine:'Limpieza bucal',
        doctor:45678734
      },
      {
        date:1493350148186,
        diagnostic:'Desalineamiento de los dientes',
        medicine:'Frenillos',
        doctor:45678734
      }
    ]
  }
}
var consultations = [
  {
    address: 'const1 medellin',
    hour: '16:00',
    day:10,
    month:05,
    year:2017,
    doctor: 657465463,
    pacient: 123123199,
    duration: 1,
    value: 20000,
    id: 1,
    ended:true
  },
  {
    address: 'const1 medellin',
    hour: '10:00',
    day:2,
    month:05,
    year:2017,
    doctor: 45678734,
    pacient: 123123,
    duration: 2,
    value: 400000,
    id: 2,
    ended:true
  },
  {
    address: 'const1 medellin',
    hour: '20:00',
    day:1,
    month:05,
    year:2017,
    doctor: 45678734,
    pacient: 123123,
    duration: 3,
    value: 40000,
    id: 3,
    ended:false
  },
  {
    address: 'const1 medellin',
    hour: '05:00',
    day:3,
    month:05,
    year:2017,
    doctor: 478734,
    pacient: 12312399,
    duration: 4,
    value: 200000,
    id: 4,
    ended:false
  }
];

const Pacient = {
  getHistoric(id){
    if(!medicInfo[id]){
      return {error:'unable to find pacient data'}
    }
    return medicInfo[id]
  },
  findPacient(id){
    let i;
    for(i=0;i<pacients.length;i++){
        if(pacients[i].docId.toString() === id.toString()){
            return pacients[i];
        }
    }
    return false
  }
}

const Consultation = {
    get: function(){
        return consultations;
    },
    create: function(consultant){
      if(!consultant.address || !consultant.hour || !consultant.day || !consultant.month || !consultant.year || !consultant.pacient || !consultant.duration || !consultant.value ){
        console.log("parametros incorrectos");
        throw 'wrong params';
      }
      consultant.ended = false;
      consultant.id = consultations.length+1;
      consultations.push(consultant);
      console.log("se creo en ");
      console.log(consultations);
      return consultant
    },
    //Retorna un objeto de la siguiente formato
    /*
    [año][mes][doctorId] = {
      value:Number
      doctor: String
    }
    */
    getHistoric: function(){
        let i,cons,res={},doctor;
        for(i=0;i<consultations.length;i++){
            cons = consultations[i];
            if(!cons.ended){
              continue;
            }
            doctor = Doctors.findDoctor(cons.doctor);
            if(!res[cons.year]){
              res[cons.year] = {}
            }
            if(!res[cons.year][cons.month]){
              res[cons.year][cons.month] = {}
            }
            if(!res[cons.year][cons.month][cons.doctor]){
              res[cons.year][cons.month][cons.doctor] = {
                  value:Number(cons.value),
                  doctor:doctor.name+' '+doctor.lastName
              }
            }else{
              res[cons.year][cons.month][cons.doctor].value += Number(cons.value);
            }
        }
        return res;
    },
    getConsultation(id){
      if(!consultations[id]){
        return {error:'unable to find consultation data'}
      }
      return consultations[id]
    },
    consultationIndex: function(id){
      let i;
      for(i=0;i<consultations.length;i++){
        if(consultations[i].id.toString()===id.toString()){
          return i
        }
      }
      throw 'unable to find id'
    },
    pay: function(id){
      try{
        let index = this.consultationIndex(id);
        consultations[index].ended = true;
        return consultations[index];
      }catch(e){
        throw e;
      }
    },
    addHistory: function(history,pacient,doctor){
      if(!medicInfo[pacient]){
        throw 'unable to find the story for this user'
      }
      history.doctor = doctor;
      history.date = new Date().getTime();
      medicInfo[pacient].history.push(history);
      return;
    },
    getByData: function(year,month){
      let i,cons,res=[],pacient,doctor;
      for(i=0;i<consultations.length;i++){
        if(consultations[i].year.toString() === year.toString() && consultations[i].month.toString() === month.toString()){
          pacient = Pacient.findPacient(consultations[i].pacient)
          doctor = Doctors.findDoctor(consultations[i].doctor)
          cons = {
            pacient:consultations[i].pacient,
            pacientName:pacient.name+' '+pacient.lastName,
            doctor:consultations[i].doctor,
            doctorName:doctor.name+' '+doctor.lastName,
            value:consultations[i].value,
            day:consultations[i].day,
            month:consultations[i].month,
            year:consultations[i].year,
            hour:consultations[i].hour
          }
          res.push(cons)
        }
      }
      return res;
    },
    allByDate:function(){
      let i,res={},pacient,doctor;
      for(i=0;i<consultations.length;i++){
        if(!res[consultations[i].year]){
          res[consultations[i].year] = {}
        }
        if(!res[consultations[i].year][consultations[i].month]){
          res[consultations[i].year][consultations[i].month] = {}
        }
        if(!res[consultations[i].year][consultations[i].month][consultations[i].id]){
          pacient = Pacient.findPacient(consultations[i].pacient)
          doctor = Doctors.findDoctor(consultations[i].doctor)
          res[consultations[i].year][consultations[i].month][consultations[i].id] = {
            pacient:consultations[i].pacient,
            pacientName:pacient.name+' '+pacient.lastName,
            doctor:consultations[i].doctor,
            doctorName:doctor.name+' '+doctor.lastName,
            value:consultations[i].value,
            day:consultations[i].day,
            month:consultations[i].month,
            year:consultations[i].year,
            hour:consultations[i].hour
          }
        }
      }
      return res;
    },
    todas:function(){
      let lista=[];
      for(var i=0;i<consultations.length;i++){
        let consulta = consultations[i];
        let medico = Doctors.findDoctor(consulta.doctor);
        let paciente = null;
        
        for(var j=0;j<pacients.length;j++){
          if(pacients[j].docId==consulta.pacient){
            paciente=pacients[j];
            break;
          }
        }

        consulta.medico=medico;
        consulta.paciente=paciente;
        lista.push(consulta);
      }
      return lista;
    }
}
const Doctors = {
    findDoctor:function(id){
        let i;
        for(i=0;i<doctors.length;i++){
            if(doctors[i].docId.toString() === id.toString()){
                return doctors[i];
            }
        }
        return false
    },
    findDoctorIndex:function(id){
        let i;
        for(i=0;i<doctors.length;i++){
            if(doctors[i].docId.toString() === id.toString()){
                return i;
            }
        }
        return false
    },
    setHours:function(id,init,end){
      let doctor = Doctors.findDoctorIndex(id);
      if(doctor === false ){
        throw 'unable to find the doctor'
      }
      if(!init || !end){
        throw 'init and end hours are required'
      }
      doctors[doctor].end = end;
      doctors[doctor].init = init;
      return;
    },
    findDoctorsByDate:function(init,end){
      let i,docs=[],initTimesDoctor,endTimesDoctor;
      for(i=0;i<doctors.length;i++){
        initTimesDoctor = doctors[i].init.split(':')
        endTimesDoctor = doctors[i].end.split(':')
        if(Number(init[0])>=Number(initTimesDoctor[0]) && Number(end[0])<=Number(endTimesDoctor[0])){
          if(Number(init[0])==Number(initTimesDoctor[0]) && Number(init[1])<Number(initTimesDoctor[1])){
            continue;
          }
          if(Number(end[0])==Number(endTimesDoctor[0]) && Number(end[1])>Number(endTimesDoctor[1])){
            continue;
          }
          docs.push(doctors[i]);
        }
      }
      if(docs.length === 0){
        throw '404'
      }
      return docs
    }
}


module.exports = function(app) {
  const globSync   = require('glob').sync;
  var mocks      = globSync('./mocks/**/*.js', { cwd: __dirname }).map(require);
  var proxies    = globSync('./proxies/**/*.js', { cwd: __dirname }).map(require);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  // Log proxy requests
  const morgan  = require('morgan');
  app.use(morgan('dev'));
  //Listar pacientes
  app.get('/api/v1/pacients',function(req,res){
    return res.json(pacients).end();
  });
  //trae la historia de un paciente pasando el id
  app.get('/api/v1/pacients/history/:id',function(req,res){
    let history = Pacient.getHistoric(req.params.id);
    if(history.error){
      return res.json(history.error).status(409).end();
    }
    return res.json(history).end();
  });
  //lista doctores
  app.get('/api/v1/doctors',function(req,res){
    return res.json(doctors).end();
  });
  app.get('/api/v1/doctors/id/:id',function(req,res){
    let doctor = Doctors.findDoctor(req.params.id);
    if(!doctor){
      return res.json("El id no existe").status(409).end();
    }
    return res.json(doctor).end();
  });
  //Asigna horarios de trabajo a los doctores en formato HH:MM
  app.put('/api/v1/doctors/hours',function(req,res){
    let init = req.body.init;
    let end = req.body.end;
    let id = req.body.doctorId;
    try{
      Doctors.setHours(id,init,end);
      return res.json({ok:'ok'}).end();
    }catch(e){
      return res.json({error:'unable to update doctor'}).status(409).end();
    }
  });
  //retorna los doctores que cumplan un horario
  app.get('/api/v1/doctors/init-hour/:initHour/init-min/:initMin/end-hour/:endHour/end-minute/:endMinute',function(req,res){
    try{
      let init = [req.params.initHour,req.params.initMin];
      let end = [req.params.endHour,req.params.endMinute];
      let doctors = Doctors.findDoctorsByDate(init,end);
      return res.json(doctors).end();
    }catch(e){
      if(e === '404'){
        return res.json({error:'unable find doctors'}).status(404).end();
      }
      return res.json({error:'error finding doctors'}).status(409).end();
    }
  });
  //lista todas las consultas
  app.get('/api/v1/consultations',function(req,res){
    return res.json(Consultation.get()).end();
  });
  //trae la informacion de una consulta pasando el id
  app.get('/api/v1/consultations/id/:id',function(req,res){
    let consultation = Consultation.getConsultation(req.params.id);
    if(consultation.error){
      return res.json(consultation.error).status(409).end();
    }
    return res.json(consultation).end();
  });
  //lista las consultas de un año en un mes
  app.get('/api/v1/consultations/year/:year/month/:month/',function(req,res){
    let consults = Consultation.getByData(req.params.year,req.params.month);
    return res.json(consults).end();
  });
  //retorna el historico de cuanto ha recaudado cada medico por año y mes
  app.get('/api/v1/consultations/history',function(req,res){
    return res.json(Consultation.getHistoric()).end();
  });
  //termina una consulta
  app.put('/api/v1/consultations/end',function(req,res){
    let consultantId = req.body.consultationId;
    let history = req.body.history;
    try{
      let consultation = Consultation.pay(consultantId);
      Consultation.addHistory(history,consultation.pacient,consultation.doctor)
      return res.json({ok:'ok'}).end();
    }catch(e){
      return res.json({error:'unable to pay'}).status(409).end();
    }
  });
  //crea una nueva cita
  app.post('/api/v1/consultations/',function(req,res){
    let consultant = req.body.consultation;
    try{
      let cons = Consultation.create(consultant);
      return res.json(cons).end();
    }catch(e){
      return res.json({error:'unable to create the consultation'}).status(409).end();
    }
  });
  //retorna un historial de todas las consultas organizadas por año y mes
  app.get('/api/v1/consultations/date',function(req,res){
    try{
      let cons = Consultation.allByDate();
      return res.json(cons).end();
    }catch(e){
      return res.json({error:'unable to create the consultation'}).status(409).end();
    }
  });

  app.get('/api/v1/consultas',function(req,res){
    try{
      let cons = Consultation.todas();
      return res.json(cons).end();
    }catch(e){
      return res.json({error:'unable to get consultation'}).status(409).end();
    }
  });
  mocks.forEach(function(route) { route(app); });
  proxies.forEach(function(route) { route(app); });
};
