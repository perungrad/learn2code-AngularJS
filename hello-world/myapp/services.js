angular.module('myapp')

.service('TagsService', function() {
  'use strict';

  this.availableTags = ['home', 'work', 'wife', 'urgent'];
  this.selectedTags = [];

});
