const { serversDatabase, commandsDatabase } = require('../../database');
const indexingReducer = require('../../helpers/indexingReducer');
const reduceUsing = require('../../helpers/reduceUsing');

module.exports = schedules => Promise.all([serversDatabase, commandsDatabase]
  .map(database => database.find({}).then(reduceUsing(indexingReducer('_id')))))
  .then(([servers, commands]) => schedules.forEach(schedule => Object.assign(schedule, {
    Servers: schedule.servers && schedule.servers.map(serverId => servers[serverId]),
    Command: schedule.command && commands[schedule.command],
  })) || schedules);
