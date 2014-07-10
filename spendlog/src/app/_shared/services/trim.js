angular.module('sl.shared')

.value('trim', function(input, charlist) {
  'use strict';

  var backRee, frontRee;

  if (charlist == null) {
    charlist = '';
  }

  if (angular.isString(input)) {
    frontRee = new RegExp('^[\\s' + charlist + ']*');
    backRee = new RegExp('[\\s' + charlist + ']*$');

    return input.replace(frontRee, '').replace(backRee, '');
  } else {
    return input;
  }
});
