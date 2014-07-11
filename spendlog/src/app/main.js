angular.module('sl', [
  'ngAnimate',
  'ngResource',
  'ngRoute',
  'mgcrea.ngStrap',
  'angular-growl',

  'sl.shared',
  'sl.templates',
  'sl.expenses',
  'sl.insert'
])

.config(function($routeProvider, $httpProvider, growlProvider) {
  'use strict';

  $routeProvider.otherwise({
    templateUrl: 'app/_shared/views/error/404.html'
  });

  $httpProvider.interceptors.push('Http404Interceptor');

  growlProvider.globalTimeToLive(3000);
  growlProvider.globalPosition('top-center');
  growlProvider.globalDisableCloseButton(true);
})

.run(function() {
  'use strict';

})

.factory('Http404Interceptor', function($q) {
  'use strict';

  return {
    responseError: function(response) {
      return $q.reject(response);
    }
  };
});
