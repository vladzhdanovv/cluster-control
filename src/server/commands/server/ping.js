const ping = require('ping');

module.exports = (host) => ping.promise.probe(host, { timeout: 2 });
