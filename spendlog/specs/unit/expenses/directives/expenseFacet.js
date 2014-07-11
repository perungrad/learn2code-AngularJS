describe('expenses.directives.expenseFacet', function() {
  'use strict';

  var $compile, $scope, scope, controller, el;


  beforeEach(module('ngRoute'));
  beforeEach(module('sl.templates'));
  beforeEach(module('sl.shared'));
  beforeEach(module('sl.expenses'));

  beforeEach(inject(function($rootScope, _$compile_) {
    el = angular.element('<a expense-facet="expense"' +
                         '   expense-facet-update="ctrl.updateExpense(expense)"></a>');
    $compile = _$compile_;
    $scope = $rootScope.$new();
    $scope.expense = {
      uuid: "8b6a22a0-e876-419f-8dba-f4cb3740e6d5",
      volume: 14.50,
      created: "2014-07-14 18:00:00"
    }
    $compile(el)($scope);
    $scope.$digest();
    scope = el.isolateScope();
    controller = el.controller('expenseFacet');
  }));


  it('should render directive', function() {
    expect(el.children('span').length).to.equal(3);
  });

  it('should render directive', function() {
    controller.updateExpense($scope.expense, {preventDefault:function(){}}),
    $scope.$digest();
    expect(el.find('input').length).to.equal(3);
  });
});
