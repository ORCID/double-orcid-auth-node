module.exports = config = {
  // Config for OAuth2 
  CLIENT_ID: 'APP-O9TUKAPVLALU1SOJ',
  CLIENT_SECRET: '0eafb938-020e-45a6-a148-3c222171d9d8',
  AUTHORIZE_URI: 'https://sandbox.orcid.org/oauth/authorize',
  TOKEN_EXCHANGE_URI: 'https://api.sandbox.orcid.org/oauth/token',
  CODE_CALLBACK_URI: 'http://localhost:8000/authorization-code-callback',
  // General server config
  PORT: '8000',
  SERVER_IP: '127.0.0.1',
}

// Environment variables overrides
for (key in config)
	if (process.env[key] != undefined)
		config[key] = process.env[key];

// www.openshift.com deployment overrides
if (process.env.OPENSHIFT_NODEJS_IP != undefined) 
	config.SERVER_IP = process.env.OPENSHIFT_NODEJS_IP;
if (process.env.OPENSHIFT_NODEJS_PORT != undefined) 
	config.PORT = process.env.OPENSHIFT_NODEJS_PORT;