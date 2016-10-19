module.exports = config = {
  // Config for OAuth2 
  DOIDUDES_CLIENT_ID: 'APP-OP444XZBA4ZS2JRH',
  DOIDUDES_CLIENT_SECRET: 'a389d518-4964-4a1f-be1b-b38e08a7c963',
  AUTHORIZE_URI: 'https://sandbox.orcid.org/oauth/authorize',
  TOKEN_EXCHANGE_URI: 'https://api.sandbox.orcid.org/oauth/token',
  DOIDUDES_CODE_CALLBACK_URI: 'https://localhost:9443/authorization-code-callback',
  // General server config
  PORT: '9443',
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
