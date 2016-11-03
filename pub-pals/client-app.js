var
  // load config from file
  config = require('./helpers/config'),
  createServer = require("auto-sni"),
  express = require('express'),
  fs = require('fs'),
  httpLogging = require('./helpers/http-logging'),
  querystring = require("querystring"),
  request = require('request'),
  session = require('express-session');

// Init express
var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(session({  
    secret: "notagoodsecretnoreallydontusethisone",  
    resave: false,
    saveUninitialized: true,
    cookie: {httpOnly: true, secure: true},  
}));

secureServer = createServer({
  email: config.LETSENCRYPT_ISSUES_EMAIL, // Emailed when certificates expire.
  agreeTos: true, // Required for letsencrypt.
  debug: config.AUTO_SNI_DEBUG, // Add console messages and uses staging LetsEncrypt server. (Disable in production)
  domains: [["localhost","www.localhost"]], // List of accepted domain names. (You can use nested arrays to register bundles with LE).
  forceSSL: true, // Make this false to disable auto http->https redirects (default true).
  redirectCode: 301, // If forceSSL is true, decide if redirect should be 301 (permanent) or 302 (temporary). Defaults to 302
  ports: {
    http: config.PORT_HTTP, // Optionally override the default http port.
    https: config.PORT_HTTPS // Optionally override the default https port.
  }
}, app);
secureServer.listen(config.PORT_HTTPS, config.SERVER_IP, function () { // Start express
  console.log('server started on ' + config.PORT_HTTPS);
});

app.get('/', function(req, res) { // Index page 
  // link we send user to authorize our requested scopes
  var auth_link = config.AUTHORIZE_URI + '?'
   + querystring.stringify({
    'redirect_uri': config.PUBPALS_CODE_CALLBACK_URI,
    'scope': '/authenticate /activities/update',
    'response_type':'code',
    'client_id': config.PUBPALS_CLIENT_ID
  });
  // reset any session on reload of '/'
  req.session.regenerate(function(err) {
      // nothing to do
  });
  res.render('pages/index', {'authorization_uri': auth_link});
});

app.get('/orcid-id.json', function(req, res) {
  res.json({'orcid_id': req.session.orcid_id});
});

app.get('/authorization-code-callback', function(req, res) { // Redeem code URL
  if (req.query.error == 'access_denied') {
    var auth_link = config.AUTHORIZE_URI + '?'
   + querystring.stringify({
    'redirect_uri': config.PUBPALS_CODE_CALLBACK_URI,
    'scope': '/authenticate /activities/update',
    'response_type':'code',
    'client_id': config.PUBPALS_CLIENT_ID
  });
    // User denied access
    res.render('pages/access_denied', {'authorization_uri': auth_link });      
  } else {
    // exchange code

    // function to render page after making request
    var exchangingCallback = function(error, response, body) {
    if (error == null) { // No errors! we have a token :-)
      var auth_link = config.AUTHORIZE_URI + '?'
   + querystring.stringify({
    'redirect_uri': config.DOIDUDES_CODE_CALLBACK_URI,
    'scope': '/authenticate /activities/update',
    'response_type':'code',
    'client_id': config.DOIDUDES_CLIENT_ID
  });
      var tokenJson = JSON.parse(body);
      console.log(tokenJson);
      req.session.orcid_id = tokenJson.orcid;
      res.render('pages/success', { 'body': JSON.parse(body), 'authorization_uri': auth_link });
    } else // handle error
      res.render('pages/error', { 'error': error });
    };

    // config for exchanging code for token 
    var exchangingReq = {
      url: config.TOKEN_EXCHANGE_URI,
      method: 'post',
      body: querystring.stringify({
        'code': req.query.code,
        'client_id': config.PUBPALS_CLIENT_ID,
        'client_secret': config.PUBPALS_CLIENT_SECRET,
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
