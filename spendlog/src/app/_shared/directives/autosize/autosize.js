angular.module('sl.shared')

.directive('autosize', function($timeout) {
  'use strict';

  return {
    restrict: 'EA',

    link: function(scope, el, attrs) {

      scope.$watch(attrs.ngModel, function() {
        el.trigger('autosize.resize');
      });

      $timeout(function() {
        el.autosize();
      });
    }
  };
});
