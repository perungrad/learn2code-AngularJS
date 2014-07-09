angular.module('directive2', [])

.controller('IndexController', function($scope) {
  'use strict';

  $scope.data = {clickCounter: 0};
})


.directive('clickCounter', function() {
  'use strict';

  return {
    restrict: 'EA',
    template: '<button ng-click="count()">count</button> {{data.clickCounter}}',

    link: function(scope, el, attrs) {
      scope.count = function() {
        scope.data.clickCounter += 1;
      }
    }
  };
});
