angular.module('sl.expenses')

.controller('Expenses.IndexController', function($scope, ExpensesRepository) {
  'use strict';

  ExpensesRepository.getList().then(function(list) {
    $scope.data = list.data;
    $scope.meta = list.meta;
  });
});
