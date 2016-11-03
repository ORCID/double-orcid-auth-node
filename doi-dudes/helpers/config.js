module.exports = config = {
  // Config for OAuth2 
  DOIDUDES_CLIENT_ID: 'APP-OP444XZBA4ZS2JRH',
  DOIDUDES_CLIENT_SECRET: 'a389d518-4964-4a1f-be1b-b38e08a7c963',
  DOIDUDES_CODE_CALLBACK_URI: 'https://localhost:9443/authorization-code-callback',
  AUTHORIZE_URI: 'https://sandbox.orcid.org/oauth/authorize',
  TOKEN_EXCHANGE_URI: 'https://api.sandbox.orcid.org/oauth/token',

  LETSENCRYPT_ISSUES_EMAIL: 'double-orcid-auth-node@mailinator.com', // Where to email when certificates expire.
  AUTO_SNI_DEBUG: true, // Add console messages and uses staging LetsEncrypt server. (Disable in production)
  DOMAINS: [["localhost","www.localhost"]], // List of accepted domain names. (You can use nested arrays to register bundles with LE).
  PORT_HTTP: 9080, // Optionally override the default http port.
  PORT_HTTPS: 9443 // Optionally override the default https port.
}

// Environment variables overrides
for (key in config)
	if (process.env[key] != undefined)
		config[key] = process.env[key];
