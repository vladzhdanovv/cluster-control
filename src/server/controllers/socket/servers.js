const mixin = require('mixin-deep');
const { serversDatabase } = require('../../database');
const crud = require('./mixin/crud');
const run = require('../../commands/server/run');
const { getState } = require('../../services/serversStateChecker');

const serversCrud = crud(serversDatabase);
const { getDataPromise } = serversCrud.methods;
serversCrud.methods.getDataPromise = async function () {
  return getDataPromise.call(this)
    .then(servers => servers.forEach((server) => {
      const state = getState(server._id);

      if (state) Object.assign(server, state);
    }) || servers);
};

module.exports = mixin({
  methods: {
    run({ server, command }) {
      run(server, command);
    }
  }
}, serversCrud);
