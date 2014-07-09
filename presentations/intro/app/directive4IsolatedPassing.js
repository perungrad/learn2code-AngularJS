angular.module('directive4IsolatedPassing', [])

.controller('IndexController', function($scope) {
  'use strict';

  $scope.data = {
    initCounter1: 15,
    initCounter2: 23
  };
})


.directive('clickCounter', function() {
  'use strict';

  return {
    restrict: 'EA',
    template: '<button ng-click="count()">count</button> {{data.counterValue}}',
    scope: {
      initValue: '=clickCounter'
    },

    link: function(scope, el, attrs) {
      scope.data = {counterValue: scope.initValue};

      scope.count = function() {
        scope.data.counterValue += 1;
      }
    }
  };
});
