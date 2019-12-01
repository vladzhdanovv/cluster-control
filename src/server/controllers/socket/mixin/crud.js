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
    async create(entity) {
      console.log('Creating ', entity);
      await model.insert(entity);
      this.emitters.data(await this.methods.getDataPromise());
    },
    async update({ _id, item }) {
      console.log('Updating ', _id, item);
      await model.update({ _id }, item);
      this.emitters.data(await this.methods.getDataPromise());
    },
    async remove({ _id }) {
      console.log('Removing ', _id);
      await model.remove({ _id });
      this.emitters.data(await this.methods.getDataPromise());
    }
  }
});
