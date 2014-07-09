angular.module('controllerNested', [])

.controller('UserController', function($scope) {
  'use strict';
  $scope.username = 'Jožko Mrkvička';
})

.controller('ButtonsController', function($scope) {
  'use strict';

  this.getUsername = function() {
    console.log($scope.username);
  };
  this.setUsername = function(username) {
    $scope.username = username;
  };
});
