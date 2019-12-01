const { resolve } = require('path');
const Datastore = require('nedb-promises');

const databases = {
  serversDatabase: Datastore.create({ filename: resolve(__dirname, '.servers.nedb'), autoload: true }),
  commandsDatabase: Datastore.create({ filename: resolve(__dirname, '.commands.nedb'), autoload: true }),
  schedulesDatabase: Datastore.create({ filename: resolve(__dirname, '.schedules.nedb'), autoload: true }),
  logsDatabase: Datastore.create({
    filename: resolve(__dirname, '.logs.nedb'),
    autoload: true,
    timestampData: true,
  }),
};

databases.logsDatabase.ensureIndex({ fieldName: 'createdAt', expireAfterSeconds: 7 * 24 * 3600});
databases.logsDatabase.persistence.setAutocompactionInterval(3600 * 1000);

module.exports = databases;
