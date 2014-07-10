angular.module('sl.shared')

.service('ExpensesRepository', function(ExpensesResource) {
  'use strict';

  this._queryCache = {};


  this.getList = function() {
    if (!this._queryCache.getList) {
      this._queryCache.getList = ExpensesResource.get().$promise;
    }

    return this._queryCache.getList;
  };


  this.storeExpense = function(volume) {
    var request = ExpensesResource.storeExpense({volume:volume});


    return request.$promise;
  };
});
