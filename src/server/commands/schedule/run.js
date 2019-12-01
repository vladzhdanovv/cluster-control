const { serversDatabase, commandsDatabase } = require('../../database');
const runCommandOnServer = require('../server/run');

module.exports = async ({ isGlobal, servers: serverIds, command: commandId }) => {
  const serversCriteria = isGlobal ? {} : { _id: { $in: serverIds }};
  const [servers, command] = await Promise.all([
    serversDatabase.find(serversCriteria),
    commandsDatabase.findOne({ _id: commandId }),
  ]);
  servers.forEach(server => runCommandOnServer(server, command));
};
