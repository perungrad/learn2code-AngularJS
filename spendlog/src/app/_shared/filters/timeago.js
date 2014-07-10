angular.module('sl.shared')

.filter('timeago', function(trim) {
  'use strict';

  return function(input, allowFuture) {
    if (!input) {
      return;
    }

    if (allowFuture == null) {
      allowFuture = false;
    }

    input = input.replace(/-/g, '/');
    var now = (new Date()).getTime();
    var date = (new Date(input)).getTime();
    var dateDifference = now - date;
    var seconds = Math.abs(dateDifference) / 1000;
    var minutes = seconds / 60;
    var hours = minutes / 60;
    var days = hours / 24;
    var years = days / 365;
    var strings = {
      prefix: (allowFuture && dateDifference < 0) ? 'in' : null,
      postfix: (allowFuture && dateDifference < 0) ? null : 'ago',
      seconds: 'few seconds',
      minute: 'a minute',
      minutes: '%d minutes',
      hour: 'an hour',
      hours: '%d hours',
      day: 'a day',
      days: '%d days',
      month: 'a month',
      months: '%d months',
      year: 'a year',
      years: '%d years'
    };

    var substitute = function(stringOrFunction, number, strings) {
      var string, value;
      value = (strings.numbers && strings.numbers[number]) || number;
      string = angular.isFunction(stringOrFunction) ? stringOrFunction(number, dateDifference) : stringOrFunction;

      return string.replace(/%d/i, value);
    };

    var words = seconds < 45 && substitute(strings.seconds, Math.round(seconds), strings) ||
    seconds < 90 && substitute(strings.minute, 1, strings) ||
    minutes < 45 && substitute(strings.minutes, Math.round(minutes), strings) ||
    minutes < 90 && substitute(strings.hour, 1, strings) ||
    hours < 24 && substitute(strings.hours, Math.round(hours), strings) ||
    hours < 42 && substitute(strings.day, 1, strings) ||
    days < 30 && substitute(strings.days, Math.round(days), strings) ||
    days < 45 && substitute(strings.month, 1, strings) ||
    days < 365 && substitute(strings.months, Math.round(days / 30), strings) ||
    years < 1.5 && substitute(strings.year, 1, strings) ||
    substitute(strings.years, Math.round(years), strings);

    return trim([strings.prefix, words, strings.postfix].join(' '));
  };
});
