module.exports = config = {
  // Config for OAuth2 
  PUBPALS_CLIENT_ID: 'APP-B9T4095P7U7W76X5',
  DOIDUDES_CLIENT_ID: 'APP-OP444XZBA4ZS2JRH',
  PUBPALS_CLIENT_SECRET: 'f6677b74-8f3f-4204-ad7d-55e449eac609',
  AUTHORIZE_URI: 'https://sandbox.orcid.org/oauth/authorize',
  TOKEN_EXCHANGE_URI: 'https://api.sandbox.orcid.org/oauth/token',
  PUBPALS_CODE_CALLBACK_URI: 'https://localhost:8443/authorization-code-callback',
  DOIDUDES_CODE_CALLBACK_URI: 'https://localhost:9443/authorization-code-callback',
  // General server config
  PORT: '8443',
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
