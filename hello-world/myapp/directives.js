angular.module('myapp')

.directive('tagsSelector', function() {
  'use strict';

  return {
    restrict: 'EA',
    templateUrl: 'myapp/templates/tagsSelector.html',
    scope: {
      model: '=tagsSelector',
      taglist: '='
    },
    link: function(scope, el, attrs) {
      scope.tags = scope.taglist;

      scope.isTagSelected = function(tag) {
        return _.include(scope.model, tag);
      };

      scope.selectTag = function(tag) {
        var idx;
        if (tag) {
          idx = scope.model.indexOf(tag);
          if (idx === -1) {
            scope.model.push(tag);
          } else {
            scope.model.splice(idx, 1);
          }
        } else {
          scope.model = [];
        }
      };
    }
  };
});
