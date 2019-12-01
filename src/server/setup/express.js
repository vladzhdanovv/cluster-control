const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('../routes');
require('express-async-errors');
const gaikan = require('gaikan');
const history = require('connect-history-api-fallback');
const config = require("../../../config");
const basicAuth = require('express-basic-auth');
const crypto = require('crypto');

function myAuthorizer(username, password) {
  const userMatches = basicAuth.safeCompare(username, 'admin');
  const passwordMatches = basicAuth.safeCompare(crypto.createHash('md5').update(password).digest('hex'), 'c8671abd9c2fda6d15acaa625ec5889e');
  return userMatches & passwordMatches
}

const app = express();
app.use(basicAuth({
  authorizer: myAuthorizer,
  challenge: true,
}));
app.set('views', path.resolve(__dirname, '..', 'view'));
app.engine('html', gaikan);
app.set('view engine', '.html');
app.set('trust proxy', true);
app.use(history({
  index: '/',
  disableDotRule: true,
  htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
if (process.env.NODE_ENV === "production") app.use(express.static(path.resolve(__dirname, '../../..', 'public')));
app.use('/', router);
app.set('port', config.port);
app.use(function (err, req, res, next) {
  const stack = err.stack ? err.stack.split("\n") : undefined;
  res.status(500);
  res.json({
    message: err.message,
    stack
  });
});

module.exports = app;
