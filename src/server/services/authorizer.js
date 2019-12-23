const fs = require('fs');
const basicAuth = require('express-basic-auth');
const hash = require('../helpers/hash');
const { passwordFile } = require('../../../config');

if (!fs.existsSync(passwordFile)) {
  console.error(new Error('No password set. Please use "cluster-control --setup" command to configure!'));
  process.exit(1);
}

const secret = fs.readFileSync(passwordFile, 'utf8');

module.exports = (username, password) => {
  const userMatches = basicAuth.safeCompare(username, 'admin');
  const passwordMatches = basicAuth.safeCompare(hash(password), secret);
  return userMatches & passwordMatches
};
