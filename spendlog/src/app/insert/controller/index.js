angular.module('sl.insert')

.controller('Insert.IndexController', function($scope, $modal, ExpensesRepository, growl) {
  'use strict';

  $scope.data = {
    volumeTotal: 0,
    foo: 'lololol\ndfsdfasfasf\nafsadfasdfsaf\n'
  };

  this.confirmPayment = function() {
    $modal({
      animation: 'am-fade-and-scale',
      scope: $scope,
      template: 'app/insert/modals/confirmPayment.html',
      placement: 'center',
    });
  };

  this.storeExpense = function() {
    ExpensesRepository.storeExpense($scope.data.volumeTotal).then(function(res) {
      growl.success('Expense saved successfuly');
      $scope.data.volumeTotal = 0;
    });
  };

  this.send = function() {
    // TODO
    $scope.data.foo = '';
  };
});
