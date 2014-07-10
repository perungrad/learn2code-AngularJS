angular.module('sl', [
  'ngAnimate',
  'ngResource',
  'ngRoute',
  'mgcrea.ngStrap',
  'angular-growl',

  'sl.shared',
  'sl.templates',
  'sl.insert'
])

.config(function($routeProvider, growlProvider) {
  'use strict';

  $routeProvider.otherwise({
    templateUrl: 'app/_shared/views/error/404.html'
  });

  growlProvider.globalTimeToLive(3000);
  growlProvider.globalPosition('top-center');
  growlProvider.globalDisableCloseButton(true);
})

.run(function() {
  'use strict';

});
