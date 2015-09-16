
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
, fs = require('fs')
, https = require('https');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.listen();
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);



  



/*http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});*/

//This line is from the Node.js HTTPS documentation.
var options = {
  key: fs.readFileSync('private/key.pem'),
  cert: fs.readFileSync('private/server.crt')
};

https.createServer(options, app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
