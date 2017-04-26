/* eslint-env node */

// To use it create some files under `mocks/`
// e.g. `server/mocks/ember-hamsters.js`
//
// module.exports = function(app) {
//   app.get('/ember-hamsters', function(req, res) {
//     res.send('hello');
//   });
// };
var doctors = [
  {
    name: 'Pedro',
    lastName: 'Velez',
    address: 'Medellin 123',
    job: 'Doctor',
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
        date:'11/11/1990',
        diagnostic:'Mucha gripa',
        medicine:'Acetaminofen y café',
        doctor:478734
      },
      {
        date:'1/11/1998',
        diagnostic:'rinitis',
        medicine:'goticas de miel en la nariz',
        doctor:478734
      },
      {
        date:'11/1/1998',
        diagnostic:'diarrea',
        medicine:'antilaxante',
        doctor:478734
      }
    ]
  },
  123123:{
    history:[
      {
        date:'12/2/2009',
        diagnostic:'dolor de cabeza',
        medicine:'dolex',
        doctor:657465463
      },
      {
        date:'11/3/2000',
        diagnostic:'dolor de estomago',
        medicine:'dejar de comer tanto',
        doctor:657465463
      },
      {
        date:'4/2/2001',
        diagnostic:'mareos',
        medicine:'dulces para controlar la presión',
        doctor:478734
      }
    ]
  },
  123123199:{
    history:[
      {
        date:'12/2/2007',
        diagnostic:'dolor de cabeza',
        medicine:'dolex',
        doctor:657465463
      },
      {
        date:'11/3/2010',
        diagnostic:'fractura de muñeca izquierda',
        medicine:'pañitos de agua',
        doctor:45678734
      },
      {
        date:'4/2/2011',
        diagnostic:'mareos',
        medicine:'no comer dulces por el azucar',
        doctor:45678734
      }
    ]
  }
}
var consultations = [
  {
    address: 'const1 medellin',
    hour: '16:00',
    day:1,
    month:1,
    year:2017,
    doctor: 657465463,
    pacient: 123123199,
    duration: 15,
    value: 20000,
    id: 1,
    ended:true
  },
  {
    address: 'const1 medellin',
    hour: '16:00',
    day:1,
    month:1,
    year:2017,
    doctor: 45678734,
    pacient: 123123,
    duration: 15,
    value: 400000,
    id: 2,
    ended:true
  },
  {
    address: 'const1 medellin',
    hour: '16:00',
    day:1,
    month:1,
    year:2017,
    doctor: 45678734,
    pacient: 123123,
    duration: 15,
    value: 40000,
    id: 2,
    ended:true
  },
  {
    address: 'const1 medellin',
    hour: '13:00',
    day:1,
    month:1,
    year:2017,
    doctor: 478734,
    pacient: 12312399,
    duration: 15,
    value: 200000,
    id: 3,
    ended:true
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
    getHistoric: function(){
        let i,cons,res={},doctor;
        for(i=0;i<consultations.length;i++){
            cons = consultations[i];
            if(!cons.ended){
              continue;
            }
            doctor = Doctors.findDoctro(cons.doctor);
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
        return;
      }catch(e){
        throw e;
      }
    },
    addHistory: function(consultant){
      if(!medicInfo[consultant.pacient]){
        throw 'unable to find the story for this user'
      }
      medicInfo[consultant.pacient].history.push(consultant);
      return;
    },
    getByData: function(year,month){
      let i,cons,res=[],pacient,doctor;
      for(i=0;i<consultations.length;i++){
        if(consultations[i].year.toString() === year.toString() && consultations[i].month.toString() === month.toString()){
          pacient = Pacient.findPacient(consultations[i].pacient)
          doctor = Pacient.findDoctro(consultations[i].doctor)
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
    }
}
const Doctors = {
    findDoctro(id){
        let i;
        for(i=0;i<doctors.length;i++){
            if(doctors[i].docId.toString() === id.toString()){
                return doctors[i];
            }
        }
        return false
    }
}


module.exports = function(app) {
  const globSync   = require('glob').sync;
  var mocks      = globSync('./mocks/**/*.js', { cwd: __dirname }).map(require);
  var proxies    = globSync('./proxies/**/*.js', { cwd: __dirname }).map(require);

  // Log proxy requests
  const morgan  = require('morgan');
  app.use(morgan('dev'));
  app.get('/api/v1/pacients',function(req,res){
    return res.json(pacients).end();
  });
  app.get('/api/v1/pacients/history/:id',function(req,res){
    let history = Pacient.getHistoric(req.params.id);
    if(history.error){
      return res.json(history.error).status(409).end();
    }
    return res.json(history).end();
  });
  app.get('/api/v1/doctors',function(req,res){
    return res.json(doctors).end();
  });
  app.get('/api/v1/consultations',function(req,res){
    return res.json(Consultation.get()).end();
  });
  app.get('/api/v1/consultations/year/:year/month/:month/',function(req,res){
    let consults = Consultation.getByData(req.params.year,req.params.month);
    return res.json(Consultation.get()).end();
  });
  app.get('/api/v1/consultations/history',function(req,res){
    return res.json(Consultation.getHistoric()).end();
  });
  app.put('/api/v1/consultations/end',function(req,res){
    let consultantId = req.body.id;
    let consultant = req.body.consultant;
    try{
      Consultation.pay(consultantId)
      Consultation.addHistory(consultant)
      return res.json({ok:'ok'}).end();
    }catch(e){
      return res.json({error:'unable to pay'}).status(409).end();
    }
  });
  mocks.forEach(function(route) { route(app); });
  proxies.forEach(function(route) { route(app); });

};
