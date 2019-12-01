const { logsDatabase } = require('../../database');
const loadable = require('./mixin/loadable');

const logsController = loadable(logsDatabase);

const { getDataPromise } = logsController.methods;
logsController.methods.getDataPromise = async function () {
  return getDataPromise.call(this).limit(1000).sort({ createdAt: -1 }).exec();
};

module.exports = logsController;
