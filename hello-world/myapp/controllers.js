angular.module('myapp')

.controller('TaskController', function($scope, TagsService) {
  'use strict';

  $scope.data = {
    filterByDone: false,
    availableTags: TagsService.availableTags,
    selectedTags: TagsService.selectedTags,
    tasks: [
      {"text":"Buy beer","done":false,"tags":["home","urgent"]},
      {"text":"Send spreadsheet","done":true,"tags":["work","urgent"]},{"text":"Send spreadsheet","done":true,"tags":["work","urgent"]},{"text":"Call Jim","done":true,"tags":["work"]},{"text":"Recharge credit card","done":true,"tags":["wife","urgent"]},{"text":"Print monthly report","done":true,"tags":["work","urgent"]},{"text":"Print monthly report","done":true,"tags":["work","urgent"]}
    ]
  };

  this.saveNewTask = function() {
    $scope.data.tasks.push({
      text: $scope.data.text,
      done: false,
      tags: $scope.data.newTaskTags,
    });
    $scope.data.text = '';
    $scope.data.newTaskTags = [];
  };

  this.getDoneCount = function() {
    return _.reduce($scope.data.tasks, function(memo, task) {
      if (task.done) {
        return memo + 1
      } else {
        return memo
      }
    }, 0);
  }

  this.filterByDone = function(task) {
    if ($scope.data.filterByDone) {
      return task.done;
    }

    return true;
  }

  this.filterByTags = function(task) {
    if ($scope.data.selectedTags.length) {
      var matchedTags = _.intersection($scope.data.selectedTags, task.tags);
      return !!matchedTags.length;
    }

    return true;
  }
});
