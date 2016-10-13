var express = require('express'), 
  config = require('./helpers/config'),
  httpLogging = require('./helpers/http-logging'),
  querystring = require("querystring"),
  request = require('request');
  
var app = express(); // Init express
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.listen(config.PORT, config.SERVER_IP, function () { // Start express
  console.log('server started on ' + config.PORT);
});

app.get('/', function(req, res) { // Index page 
  // link we send user to authorize our requested scopes
  var auth_link = config.AUTHORIZE_URI + '?'
   + querystring.stringify({
    'redirect_uri': config.CODE_CALLBACK_URI_01,
    'scope': '/authenticate /activities/update',
    'response_type':'code',
    'client_id': config.CLIENT_ID_01
  });
  res.render('pages/index', {'authorization_uri': auth_link});
});

app.get('/authorization-code-callback_01', function(req, res) { // Redeem code URL
  var doidudes_auth_link = config.AUTHORIZE_URI + '?'
   + querystring.stringify({
    'redirect_uri': config.CODE_CALLBACK_URI_02,
    'scope': '/authenticate /activities/update',
    'response_type':'code',
    'client_id': config.CLIENT_ID_02
  });

  if (req.query.error == 'access_denied') {
    // User denied access
    res.render('pages/access_denied', { 'error': 'User denied access' });      
  } else {
    // exchange code

    // function to render page after making request
    var exchangingCallback = function(error, response, body) {
    if (error == null) // No errors! we have a token :-)
      res.render('pages/pubpals-success', { 'body': JSON.parse(body),'authorization_uri': doidudes_auth_link });
    else // handle error
      res.render('pages/error', { 'error': error });
    };

    // config for exchanging code for token 
    var exchangingReq = {
      url: config.TOKEN_EXCHANGE_URI,
      method: 'post',
      body: querystring.stringify({
        'code': req.query.code,
        'client_id': config.CLIENT_ID_01,
        'client_secret': config.CLIENT_SECRET_01,
        'grant_type': 'authorization_code',
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
      }
    }
    
    //making request exchanging code for token
    request(exchangingReq, exchangingCallback);
  }
});

app.get('/authorization-code-callback_02', function(req, res) { // Redeem code URL
  if (req.query.error == 'access_denied') {
    // User denied access
    res.render('pages/access_denied', { 'error': 'User denied access' });      
  } else {
    // exchange code

    // function to render page after making request
    var exchangingCallback = function(error, response, body) {
    if (error == null) // No errors! we have a token :-)
      res.render('pages/doidudes-success', { 'body': JSON.parse(body) });
    else // handle error
      res.render('pages/error', { 'error': error });
    };

    // config for exchanging code for token 
    var exchangingReq = {
      url: config.TOKEN_EXCHANGE_URI,
      method: 'post',
      body: querystring.stringify({
        'code': req.query.code,
        'client_id': config.CLIENT_ID_02,
        'client_secret': config.CLIENT_SECRET_02,
        'grant_type': 'authorization_code',
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
      }
    }
    
    //making request exchanging code for token
    request(exchangingReq, exchangingCallback);
  }
});