angular.module('directive3', [])

.controller('IndexController', function($scope) {
  'use strict';
})


.directive('clickCounter', function() {
  'use strict';

  return {
    restrict: 'EA',
    template: '<button ng-click="count()">count</button> {{data.conterValue}}',
    scope: {},

    link: function(scope, el, attrs) {
      scope.data = {conterValue: 0};

      scope.count = function() {
        scope.data.conterValue += 1;
      }
    }
  };
});
