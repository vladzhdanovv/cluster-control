const { getClient } = require('../../services/ssh');

module.exports = (server, command) => {
  const client = getClient(server);
  return client.exec(command); // async
};
