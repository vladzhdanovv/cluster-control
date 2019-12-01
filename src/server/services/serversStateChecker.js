const nodeSchedule = require('node-schedule');
const app = require('../setup/express');
const { serversDatabase } = require('../database');
const ping = require('../commands/server/ping');
const checkSsh = require('../commands/server/checkSsh');

const states = {};

nodeSchedule.scheduleJob('*/2 * * * * *', () => serversDatabase.find().then(servers => servers.forEach(server => {
  const io = app.get('io');

  if (!io) {
    console.log('Socket.io not yet initialized');
    return;
  }

  const serversNamespace = io.of('servers');
  const { _id, host } = server;
  const serverState = states[_id] = states[_id] || { latency: 0, sshStatus: false};
  ping(host).then(({ time: latency }) => {
    serverState.latency = latency;
    serversNamespace.emit('updateLatency', { host, latency });
  });
  checkSsh(server).then((status) => {
    serverState.sshStatus = status;
    serversNamespace.emit('updateSshStatus', { host, status });
  })
})));

module.exports = {
  getState: _id => states[_id],
};
