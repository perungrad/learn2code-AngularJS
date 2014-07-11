angular.module('sl.shared')

.factory('ExpensesResource', function($resource, apiUrl) {
  'use strict';

  var resource = $resource(apiUrl + '/expenses/:uuid', {
    uuid: '@uuid'

  }, {
    storeExpense: {
      method: 'POST'
    }
  });


  return resource;
});
