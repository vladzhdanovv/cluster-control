const { resolve } = require('path');
const Datastore = require('nedb-promises');

module.exports = {
  servers: Datastore.create({ filename: resolve(__dirname, '.servers.nedb'), autoload: true }),
  commands: Datastore.create({ filename: resolve(__dirname, '.commands.nedb'), autoload: true }),
  schedules: Datastore.create({ filename: resolve(__dirname, '.schedules.nedb'), autoload: true }),
};
