var _ = require('lodash');
var moment = require('moment');
var expenses = require(__dirname + '/../../fixtures/expenses.json');

expenses = _.map(expenses, function(expense) {
  delete(expense.id);
  return expense;
});


var index = function(req, res) {
  var from = Number(req.query.from) || 0;
  var pageSize = 5;
  var payload = {
    data: {
      expenses: (from) ? expenses.slice((from - 1), (from + pageSize - 1)) : expenses.slice(0, pageSize),
      total: _.reduce(expenses, function(memo, expense) {
        return memo + expense.volume;
      }, 0)
    },
    meta: {
      hasMore: !!expenses[from + pageSize - 1]
    }
  };

  res.send(payload);
};

var show = function(req, res) {
  var uuid = req.params.uuid;
  var expense = _.find(expenses, function(expense) {
    return expense.uuid === uuid;
  });

  if (expense) {
    var payload = {
      data: {
        expense: expense
      }
    };

    res.send(payload);
  } else {
    res.status(404).end();
  }
};

var save = function(req, res) {
  var volume = Number(req.body.volume);
  var expenseRecord = {
    uuid: _.uniqueId(),
    volume: volume,
    created: moment().format('YYYY-MM-DD HH:mm:ss')
  };

  expenses.unshift(expenseRecord);
  res.send(expenseRecord);
};

var update = function(req, res) {
  var uuid = req.params.uuid;
  var expense = _.find(expenses, function(expense) {
    return expense.uuid === uuid;
  });

  if (expense) {
    expense.volume = req.body.volume;
    expense.updated = moment().format('YYYY-MM-DD HH:mm:ss');
    res.send(expense);
  } else {
    res.status(404).end();
  }
};

var doDelete = function(req, res) {
  var uuid = req.params.uuid;
  var expense = _.find(expenses, function(expense) {
    return expense.uuid === uuid;
  });

  if (expense) {
    expenses.splice(expenses.indexOf(expense), 1);
    res.status(200).end();
  } else {
    res.status(404).end();
  }
};



exports = module.exports = function(apiRouter) {
    apiRouter.get('/expenses/:uuid', show);
    apiRouter.put('/expenses/:uuid', update);
    apiRouter.delete('/expenses/:uuid', doDelete);
    apiRouter.get('/expenses', index);
    apiRouter.post('/expenses', save);
};
