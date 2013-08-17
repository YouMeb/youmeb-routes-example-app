
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var Routes = require('youmeb-routes');

var app = express();
var routes = require('./routes')(app);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(routes.middleware());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

routes.generate(function (err) {
  if (err) {
    throw err;
    return console.error(err);
  }
  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
});
