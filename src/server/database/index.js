const { resolve } = require('path');
const Datastore = require('nedb-promises');
const homedir = require('os').homedir();
const { mkdirSync } = require('fs');

const databaseDirectory = resolve(homedir, '.cluster-control');
try {
  mkdirSync(databaseDirectory);
} catch (e) {}
const databases = {
  serversDatabase: Datastore.create({ filename: resolve(databaseDirectory, '.servers.nedb'), autoload: true }),
  commandsDatabase: Datastore.create({ filename: resolve(databaseDirectory, '.commands.nedb'), autoload: true }),
  schedulesDatabase: Datastore.create({ filename: resolve(databaseDirectory, '.schedules.nedb'), autoload: true }),
  logsDatabase: Datastore.create({
    filename: resolve(databaseDirectory, '.logs.nedb'),
    autoload: true,
    timestampData: true,
  }),
};

databases.logsDatabase.ensureIndex({ fieldName: 'createdAt', expireAfterSeconds: 7 * 24 * 3600});
databases.logsDatabase.persistence.setAutocompactionInterval(3600 * 1000);

module.exports = databases;
