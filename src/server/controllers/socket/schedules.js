const { schedulesDatabase } = require('../../database');
const populate = require('../../commands/schedule/populate');
const commandsScheduler = require('../../services/commandsScheduler');
const crud = require('./mixin/crud');

const schedulesCrud = crud(schedulesDatabase);
const { getDataPromise, create, update, remove } = schedulesCrud.methods;
schedulesCrud.methods.getDataPromise = async function () {
  return getDataPromise.call(this)
    .then(populate);
};
schedulesCrud.methods.create = async function(payload) {
  await create.call(this, payload);
  commandsScheduler.add(payload);
};
schedulesCrud.methods.update = async function(payload) {
  const { _id, item: { time } } = payload;
  await update.call(this, payload);
  commandsScheduler.add({ _id, time });
};
schedulesCrud.methods.remove = async function(payload) {
  await remove.call(this, payload);
  commandsScheduler.remove(payload._id);
};

module.exports = schedulesCrud;
