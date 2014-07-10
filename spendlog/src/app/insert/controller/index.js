angular.module('sl.insert')

.controller('Insert.IndexController', function($scope, $modal, ExpensesRepository, growl) {
  'use strict';

  $scope.data = {
    volumeTotal: 0,
    volumeX10: undefined,
    volumeX1: undefined,
    volumeX01: undefined,
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
    })
  };


  $scope.$watchGroup(['data.volumeX10', 'data.volumeX1', 'data.volumeX01'], function() {
    if ($scope.data.volumeX10 !== undefined &&
        $scope.data.volumeX1 !== undefined &&
        $scope.data.volumeX01 !== undefined) {
      $scope.data.volumeTotal = ($scope.data.volumeX10 * 10) +
        ($scope.data.volumeX1 * 1) +
        ($scope.data.volumeX01 * 0.1);
    }
  });

  $scope.$watch('data.volumeTotal', function(newValue, oldValue) {
    $scope.data.volumeX10 = parseInt(($scope.data.volumeTotal % 100) / 10);
    $scope.data.volumeX1  = parseInt(($scope.data.volumeTotal % 10)  / 1);
    $scope.data.volumeX01 = parseInt(($scope.data.volumeTotal * 10 % 10));
  });
});
