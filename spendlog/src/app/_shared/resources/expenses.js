angular.module('sl.shared')

.factory('ExpensesResource', function($resource, apiUrl) {
  'use strict';

  var res = $resource(apiUrl + '/expenses/:id', {
    id: '@id'

  }, {
    storeExpense: {
      method: 'POST'
    }
  });


  return res;
});
