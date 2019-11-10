const mixin = require('mixin-deep');
const { servers } = require('../../database');
const crud = require('./mixin/crud');
const ping = require('../../commands/server/ping');
const checkSsh = require('../../commands/server/checkSsh');

module.exports = mixin({
  methods: {
    async checkLatency(host) {
      try {
        const result = await ping(host);
        this.emit('updateLatency', { host, latency: result.time });
      } catch (e) {
        this.emit('updateLatency', { host, latency: 0 });
        console.log(e);
      }
    },
    async checkSsh(server) {
      const { host } = server;
      const status = await checkSsh(server);
      this.emit('updateSshStatus', { host, status });
    },
  }
}, crud(servers));
