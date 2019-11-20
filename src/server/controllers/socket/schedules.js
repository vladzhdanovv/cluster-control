const { schedules: schedulesDatabase, servers: serversDatabase, commands: commandsDatabase } = require('../../database');
const crud = require('./mixin/crud');

const remap = (acc, item) => Object.assign(acc, {[item._id]: item});
const schedulesCrud = crud(schedulesDatabase);
const originalDataPromiseGetter = schedulesCrud.methods.getDataPromise;
schedulesCrud.methods.getDataPromise = async function () {
  const [servers, commands] = await Promise.all([
    serversDatabase.find({}).then(servers => servers.reduce(remap, {})),
    commandsDatabase.find({}).then(commands => commands.reduce(remap, {})),
  ]);
  return originalDataPromiseGetter.call(this)
    .then((schedules) => {
      schedules.forEach((schedule) => {
        schedule.servers = schedule.servers && schedule.servers.map(serverId => servers[serverId]);
        schedule.command = schedule.command && commands[schedule.command];
      });
    });
};

module.exports = schedulesCrud;
