module.exports = async (server) => {
  const io = require('socket.io')(server, {
    pingTimeout: 60000,
  });
  const setupController = require('socket.io-namespace-controller').driver(io);
  setupController('/servers', require('./servers'));
  setupController('/commands', require('./commands'));
  setupController('/schedules', require('./schedules'));

  return io;
};
