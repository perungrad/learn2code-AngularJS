angular.module('sl.insert')

.controller('Insert.IndexController', function($scope) {
  'use strict';

  $scope.data = {
    volumeTotal: 14.7,
    volumeX10: undefined,
    volumeX1: undefined,
    volumeX01: undefined,
  };


  $scope.$watchGroup(['data.volumeX10', 'data.volumeX1', 'data.volumeX01'], function() {
    $scope.data.volumeTotal = ($scope.data.volumeX10 * 10) + ($scope.data.volumeX1 * 1) + ($scope.data.volumeX01 * 0.1);
  });

  $scope.data.volumeX10 = parseInt(($scope.data.volumeTotal % 100) / 10);
  $scope.data.volumeX1  = parseInt(($scope.data.volumeTotal % 10)  / 1);
  $scope.data.volumeX01 = parseInt(($scope.data.volumeTotal * 10 % 10));
});
