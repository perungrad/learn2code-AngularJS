angular.module('sl.expenses')

.directive('expenseFacet', function() {
  'use strict';

  return {
    restrict: 'EA',
    templateUrl: 'app/expenses/directives/expenseFacet/expenseFacet.html',
    scope: {
      expense: '=expenseFacet',
      updateExpense: '&expenseFacetUpdate',
      deleteExpense: '&expenseFacetDelete',
    },

    controller: function($scope, $compile, $element) {
      var insertFacet;
      var expenseVolume;

      this.updateExpense = function(expense, $event) {
        $event.preventDefault();

        if (!insertFacet) {
          expenseVolume = expense.volume;
          $scope.expense = expense;
          insertFacet = $compile('<div insert-facet="expense.volume" class="external"></div>')($scope);
          $element.append(insertFacet);
        } else {
          insertFacet.scope().$destroy();
          insertFacet.remove();
          insertFacet = null;

          if (expenseVolume !== $scope.expense.volume) {
            $scope.updateExpense({expense:expense});
          }
        }
      };

      this.deleteExpense = function(expense, $event) {
        $event.preventDefault();
        $scope.deleteExpense({expense: expense});
      };
    },
    controllerAs: 'ctrl',

    link: function(scope, el, attrs) {
    }
  };
});
