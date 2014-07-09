angular.module('controllerMethods', [])

.controller('UserController', function($scope, $timeout) {
  'use strict';

  this.setUsername = function(username) {
    $scope.username = username || 'srigi';
  };
});
