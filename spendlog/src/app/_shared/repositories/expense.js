angular.module('sl.shared')

.service('ExpensesRepository', function($q, ExpensesResource) {
  'use strict';

  this._queryCache = {};


  this.getList = function() {
    if (!this._queryCache.getList) {
      this._queryCache.getList = ExpensesResource.get().$promise;
      this._queryCache.getList.then(function(list) {
        list.data.expenses = _.map(list.data.expenses, function(expense) {
          return new ExpensesResource(expense);
        });
      });
    }

    return this._queryCache.getList;
  };

  this.loadMore = function() {
    var dfd = $q.defer();
    var listPromise = this.getList();

    listPromise.then(function(list) {
      var countListItems = list.data.expenses.length;
      var loadMorePromise = ExpensesResource.get({from: countListItems + 1}).$promise;

      loadMorePromise.then(function(moreList) {
        moreList.data.expenses = _.map(moreList.data.expenses, function(expense) {
          return new ExpensesResource(expense);
        });
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

  this.deleteExpense = function(expense) {
    var promise = expense.delete();
    var idx;

    this.getList().then(function(list) {
      idx = list.data.expenses.indexOf(expense);
      list.data.expenses.splice(idx, 1);
    });

    promise.then(null, function() {
      this.getList().then(function(list) {
        list.data.expenses.splice(idx, 0, expense);
      });
    }.bind(this));

    return promise;
  };
});
