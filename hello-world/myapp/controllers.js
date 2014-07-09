angular.module('myapp')

.controller('TaskController', function($scope) {
  'use strict';

  $scope.data = {
    onlyDone: false,
    selectedTags: [],
    tasks: [
      {"text":"Buy beer","done":false,"tags":["home","urgent"]},
      {"text":"Send spreadsheet","done":true,"tags":["work","urgent"]},{"text":"Send spreadsheet","done":true,"tags":["work","urgent"]},{"text":"Call Jim","done":true,"tags":["work"]},{"text":"Recharge credit card","done":true,"tags":["wife","urgent"]},{"text":"Print monthly report","done":true,"tags":["work","urgent"]},{"text":"Print monthly report","done":true,"tags":["work","urgent"]}
    ]
  };

  this.saveNewTask = function() {
    $scope.data.tasks.unshift({
      text: $scope.data.text,
      done: true,
      tags: [],
    });
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
});
