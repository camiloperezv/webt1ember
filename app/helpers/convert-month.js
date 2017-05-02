import Ember from 'ember';

export function convertMonth(params/*, hash*/) {
  var month = [];
  month[1] = "Enero";
  month[2] = "Febrero";
  month[3] = "Marzo";
  month[4] = "Abril";
  month[5] = "Mayo";
  month[6] = "Junio";
  month[7] = "Julio";
  month[8] = "Agosto";
  month[9] = "Septiembre";
  month[10] ="Octubre"; 
  month[11] = "Noviembre";
  month[12] = "Diciembre";
  return month[params[0]];
}

export default Ember.Helper.helper(convertMonth);
