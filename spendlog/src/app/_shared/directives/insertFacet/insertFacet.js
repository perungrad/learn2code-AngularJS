angular.module('sl.shared')

.directive('insertFacet', function() {
  'use strict';

  return {
    restrict: 'EA',
    templateUrl: 'app/_shared/directives/insertFacet/insertFacet.html',
    scope: {
      volumeTotal: '=insertFacet'
    },

    link: function(scope, el, attrs) {
      scope.data = {};

      scope.$watchGroup(['data.volumeX10', 'data.volumeX1', 'data.volumeX01'], function() {
        if (scope.data.volumeX10 !== undefined &&
            scope.data.volumeX1 !== undefined &&
            scope.data.volumeX01 !== undefined) {
          scope.volumeTotal = (scope.data.volumeX10 * 10) +
            (scope.data.volumeX1 * 1) +
            (scope.data.volumeX01 * 0.1);
        }
      });

      scope.$watch('volumeTotal', function(newValue, oldValue) {
        scope.data.volumeX10 = parseInt((scope.volumeTotal % 100) / 10);
        scope.data.volumeX1  = parseInt((scope.volumeTotal % 10)  / 1);
        scope.data.volumeX01 = parseInt((scope.volumeTotal * 10 % 10));
      });
    }
  };
});
