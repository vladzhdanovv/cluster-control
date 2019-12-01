const { logsDatabase } = require('../../database');
const app = require('../../setup/express');

module.exports = async (server, commandData, output, isError = false) => {
  const { host } = server;
  const { command } = commandData;
  const line = await logsDatabase.insert({ host, command, output, isError });
  const io = app.get('io');
  if (io) io.of('logs').emit('addLine', line);
};
