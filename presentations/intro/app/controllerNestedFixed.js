angular.module('controllerNestedFixed', [])

.controller('UserController', function($scope) {
  'use strict';
  $scope.data = {username: 'Jožko Mrkvička'};
})

.controller('ButtonsController', function($scope) {
  'use strict';

  this.getUsername = function() {
    console.log($scope.data.username);
  };
  this.setUsername = function(username) {
    $scope.data.username = username;
  };
});
