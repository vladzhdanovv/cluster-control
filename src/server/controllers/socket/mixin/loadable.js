module.exports = (model) => ({
  emitters: {
    data(data) {
      this.emit('data', data);
    }
  },
  methods: {
    getDataPromise() {
      return model.find();
    },
    async load() {
      this.emitters.data(await this.methods.getDataPromise());
    },
  }
});
