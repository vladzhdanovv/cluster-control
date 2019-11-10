module.exports = client => ({
  async load(options) {
    this.emit('data', await this.methods._load(options));
  },
  _load(options) {
    options = options || {};
    return client.getList(options);
  },
});