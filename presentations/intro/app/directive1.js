angular.module('directive1', [])

.controller('IndexController', function($scope) {
  'use strict';

  $scope.data = {clickCounter: 0};
})


.directive('clickCounter', function() {
  'use strict';

  return function(scope, el, attrs) {
      console.log(scope, el, attrs);
    }
});
