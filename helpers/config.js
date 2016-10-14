module.exports = config = {
  // Config for OAuth2 
  CLIENT_ID_01: 'APP-B9T4095P7U7W76X5',
  CLIENT_SECRET_01: 'f6677b74-8f3f-4204-ad7d-55e449eac609',
  CLIENT_ID_02: 'APP-OP444XZBA4ZS2JRH',
  CLIENT_SECRET_02: 'a389d518-4964-4a1f-be1b-b38e08a7c963',
  AUTHORIZE_URI: 'https://sandbox.orcid.org/oauth/authorize',
  TOKEN_EXCHANGE_URI: 'https://api.sandbox.orcid.org/oauth/token',
  CODE_CALLBACK_URI_01: 'https://localhost:8443/authorization-code-callback_01',
  CODE_CALLBACK_URI_02: 'https://localhost:8443/authorization-code-callback_02',
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
