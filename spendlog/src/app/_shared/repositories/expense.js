angular.module('sl.shared')

.service('ExpensesRepository', function($q, ExpensesResource) {
  'use strict';

  this._queryCache = {};


  this.getList = function() {
    if (!this._queryCache.getList) {
      this._queryCache.getList = ExpensesResource.get().$promise;
    }

    return this._queryCache.getList;
  };

  this.loadMore = function() {
    var dfd = $q.defer();
    var listPromise = this.getList();

    listPromise.then(function(list) {
      var countListItems = list.data.expenses.length;
      var loadMorePromise = ExpensesResource.get({from: countListItems + 1}).$promise;
      listPromise = loadMorePromise;

      loadMorePromise.then(function(moreList) {
        list.data.expenses.push.apply(list.data.expenses, moreList.data.expenses);
        list.meta.hasMore = moreList.meta.hasMore;
        dfd.resolve(moreList);
      });
    });

    return dfd.promise;
  };

  this.storeExpense = function(volume) {
    var request = ExpensesResource.storeExpense({volume:volume});

    request.$promise.then(function(expense) {
      if (this._queryCache.getList) {
        this.getList().then(function(list) {
          list.data.expenses.unshift(expense);
          list.data.total += expense.volume;
        });
      }
    }.bind(this));

    return request.$promise;
  };
});
