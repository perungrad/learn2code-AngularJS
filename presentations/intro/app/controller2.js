angular.module('controller2', [])

.controller('UserController', function($scope, $timeout) {
  'use strict';

  $scope.username = "Jožko Mrkvička";

  $timeout(function() {
    $scope.username = "Ferko Reďkovka";
  }, 5000);
});
