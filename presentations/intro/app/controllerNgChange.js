angular.module('controllerNgChange', [])

.controller('UserController', function($scope, $timeout) {
  'use strict';

  this.newUsername = function() {
    console.log($scope.username);
  };
});
