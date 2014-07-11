angular.module('sl.expenses')

.controller('Expenses.IndexController', function($scope, ExpensesRepository, growl) {
  'use strict';

  this.loadMore = function() {
    ExpensesRepository.loadMore();
  };

  this.deleteExpense = function(expense, $event) {
    $event.preventDefault();
    ExpensesRepository.deleteExpense(expense).then(null, function() {
      growl.error('Server error');
    });
  };

  ExpensesRepository.getList().then(function(list) {
    $scope.data = list.data;
    $scope.meta = list.meta;
  });
});
