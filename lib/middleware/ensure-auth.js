const jwt = require('express-jwt');
const jwtRsa = require('jwks-rsa');

module.exports = jwt({
  credentialsRequired: process.env.NODE_ENV !== 'test',
  // Dynamically provide a signing key
  // based on the kid in the header and 
  // the signing keys provided by the JWKS endpoint.
  secret: jwtRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://jackmcconnell.auth0.com/.well-known/jwks.json'
  }),

  // Validate the audience and the issuer.
  audience: '5MEUNeuoSqvjX0WShY91Vd8v0ltcQkAJ',
  issuer: 'https://jackmcconnell.auth0.com/',
  algorithms: ['RS256']
});
