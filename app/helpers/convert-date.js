import Ember from 'ember';

export function formattedDate(params/*, hash*/) {
  return new Date(params[0]).toLocaleString();
}

export default Ember.Helper.helper(formattedDate);
