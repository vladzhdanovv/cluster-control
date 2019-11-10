const { getState } = require('../../services/ssh');

module.exports = server => getState(server);
