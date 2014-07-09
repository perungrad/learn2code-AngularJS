angular.module('myapp')

.controller('UserController', function($scope, $timeout) {
  'use strict';

  $scope.username = 'Anicka';


  this.setUsername = function(username) {
    $scope.username = username || 'srigi';
  };

});
