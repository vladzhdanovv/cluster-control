const { resolve } = require('path');
const homedir = require('os').homedir();

const config = {
  all: {
    passwordFile: resolve(homedir, '.cluster-control', '.passwd')
  },
  production: {
    port: 8001,
  },
  development: {
    port: 8001,
  }
};
const env = process.env.NODE_ENV === "production" ? "production" : "development";
module.exports = Object.assign({}, config.all, config[env]);
