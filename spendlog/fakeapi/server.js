var express      = require('express');
var fs           = require('fs');

var bodyParser   = require('body-parser');
var errorhandler = require('errorhandler');
var logger       = require('morgan');


// Configure web server
var port = process.env.FAKEAPI_PORT || 8001;
var app = express();
app.use(bodyParser.json());
app.use(logger('[:status] :method :url (:response-time ms)'));
if (app.get('env') === 'development') {
    app.use(errorhandler());
}

app.listen(port, function() {
  console.log('Fake API server listening on port ' + port);
});


// Setup index route
app.get('/', function(req, res) {
    res.send('Hello world!');
});

// Setup fake API routes
var apiRouter = express.Router();
apiRouter.get('/', function(req, res) {
    res.send('Hello fake API!');
});

fs.readdirSync(__dirname + '/controllers').forEach(function(file) {
    require(__dirname + '/controllers/' + file)(apiRouter);
});
app.use('/fakeapi', apiRouter);


// Serve error404 when no middleware responded
app.use(function(req, res, next) {
    res.status(404).send('404');
});
