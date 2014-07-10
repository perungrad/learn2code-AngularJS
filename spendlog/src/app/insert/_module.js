angular.module('sl.insert', [])


.config(function($routeProvider){
  'use strict';

  $routeProvider
    .when('/', {
      controller: 'Insert.IndexController as ctrl',
      templateUrl: 'app/insert/views/index.html'
    });
});

