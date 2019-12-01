const { getClient } = require('../../services/ssh');
const addLog = require('../log/add');

module.exports = async (server, command) => {
  console.log(`Sending command ${command.name} to server ${server.name}`);
  try {
    const client = getClient(server);
    const output = await client.exec(command.command);
    addLog(server, command, output);
    return output;
  } catch (e) {
    addLog(server, command, e.toString(), true);
  }

};
