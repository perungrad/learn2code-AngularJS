angular.module('myapp')

.directive('tagsSelector', function(TagsService) {
  'use strict';

  return {
    restrict: 'EA',
    templateUrl: 'myapp/templates/tagsSelector.html',
    scope: {
    },

    link: function(scope, el, attrs) {
      scope.tags = TagsService.availableTags;
      scope.model = TagsService.selectedTags;

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
          scope.model.splice(0, scope.model.length);
        }
      };
    }
  };
});
