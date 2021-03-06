const express = require('express'),
      logger = require('morgan'),
      bodyParser = require('body-parser'),
      top = require('./routes/top'),
      methodOverride = require('method-override'),
      os = require('os'),
      app = express();

app.set('views', __dirname + '/views');
app.set('view_engine', 'ejs');

//middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
app.use(logger('dev'));
app.use(function(err, req, res, next){
  res.send(err.message);
});

app.use(express.static(__dirname + '/public'));

app.get('/', top.index);

const PORT = 8080;
const HOST = '0.0.0.0';

// start server on the specified port and binding host
const server = app.listen(PORT, HOST, function() {
  // print a message when the server starts listening
  console.log(`server starting on http://${HOST}:${PORT}`);
});
exports.server = server;
