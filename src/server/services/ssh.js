const SSHClient = require('ssh2-promise');

const pool = {};

function getKey({ host, port, user, password }) {
  console.log(`${host}:${port}:${user}:${password}`);
  return `${host}:${port}:${user}:${password}`;
}

function add(server) {
  const { host, port, user: username, password } = server;
  const client = pool[getKey(server)] = new SSHClient({
    host,
    port,
    username,
    password,
    reconnect: false,
    readyTimeout: 5000,
  }, true);
  client.connect().catch((e) => {});
  return client;
}

function getClient(server) {
  return pool[getKey(server)] || add(server);
}

async function getState(server) {
  try {
    const client = getClient(server);
    await client.connect();
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = {
  getClient,
  getState
};
