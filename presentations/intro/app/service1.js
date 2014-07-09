angular.module('service1', ['ngResource'])

.factory('TaskResource', function($resource) {
  'use strict';

  return $resource('api/tasks.php');
})


.controller('TaskController', function($scope, TaskResource) {
  'use strict';

  $scope.data = {
    selectedTags: [],
    tasks: []
  };

  var fetchTasks = function() {
    var params = {};
    if ($scope.data.selectedTags) {
      params.tag = $scope.data.selectedTags;
    }
    $scope.data.tasks = TaskResource.query(params);
  };

  $scope.$watch('data.selectedTags', fetchTasks, true);
})


.directive('tagsSelector', function() {
  'use strict';

  return {
    restrict: 'EA',
    templateUrl: 'app/templates/tagsSelector.html',
    scope: {
      model: '=tagsSelector'
    },

    link: function(scope, el, attrs) {
      scope.tags = ['home', 'work', 'wife', 'urgent'];

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
