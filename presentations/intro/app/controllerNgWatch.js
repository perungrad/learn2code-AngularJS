angular.module('controllerNgWatch', [])

.controller('UserController', function($scope, $timeout) {
  'use strict';

  $scope.$watch('username', function() {
    console.log($scope.username);
  });
});
