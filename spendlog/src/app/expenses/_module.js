angular.module('sl.expenses', [])


.config(function($routeProvider){
  'use strict';

  $routeProvider
    .when('/expenses', {
      controller: 'Expenses.IndexController as ctrl',
      templateUrl: 'app/expenses/views/index.html'
    });
});
