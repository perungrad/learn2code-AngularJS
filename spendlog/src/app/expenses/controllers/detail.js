angular.module('sl.expenses')

.controller('Expenses.DetailController', function($scope, $routeParams, $modal, ExpensesRepository) {
  'use strict';

  ExpensesRepository.findByUuid($routeParams.uuid).then(function(one) {
    $scope.data = one.data;
  }, function() {
    var modal = $modal({
      animation: 'am-fade-and-scale',
      contentTemplate: 'app/_shared/views/error/404.html',
    });

    $scope.$on('$locationChangeStart', function() {
      modal.hide();
    });
  });
});
