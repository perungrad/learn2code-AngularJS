angular.module('sl.shared')

.directive('navbar', function($route) {

  return {
    restrict: 'EA',
    templateUrl: 'app/_shared/directives/navbar/navbar.html',
    scope: {
    },

    link: function(scope, el, attrs) {
      scope.$on('$routeChangeSuccess', function(ev, current) {
        var section = current.$$route.controller.match(/^(\w+)\./)[1];

        scope.isExpensesSection = (section === 'Expenses');
      })
    }
  }
});
