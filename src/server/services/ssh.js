const SSHClient = require('ssh2-promise');

const pool = {};
const status = {};

function getKey({ host, port, user, password }) {
  return `${host}:${port}:${user}:${password}`;
}

function add(server) {
  const { host, port, user: username, password } = server;
  const key = getKey(server);
  const client = pool[key] = new SSHClient({
    host,
    port,
    username,
    password,
    reconnect: false,
    readyTimeout: 5000,
  }, true);
  client.on('ssh:disconnect', () => {
    status[key] = client.connect();
  });
  return client;
}

function getClient(server) {
  return pool[getKey(server)] || add(server);
}

async function getState(server) {
  const client = getClient(server);
  const key = getKey(server);
  status[key] = status[key] || client.connect();
  try {
    await status[key];
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = {
  getClient,
  getState
};
