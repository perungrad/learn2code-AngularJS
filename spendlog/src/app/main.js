angular.module('sl', [
  'ngAnimate',
  'ngResource',
  'ngRoute',
  'mgcrea.ngStrap',

  'sl.templates',
  'sl.insert'
])

.config(function($routeProvider) {
  'use strict';

  $routeProvider.otherwise({
    templateUrl: 'app/_shared/views/error/404.html'
  });
})

.run(function() {
  'use strict';

});
