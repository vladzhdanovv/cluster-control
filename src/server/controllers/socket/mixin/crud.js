module.exports = (model) => ({
  emitters: {
    async data() {
      this.emit('data', await model.find());
    }
  },
  methods: {
    async load() {
      this.emitters.data();
    },
    async create(entity) {
      console.log('Creating ', entity);
      await model.insert(entity);
    },
    async update({ _id, item }) {
      console.log('Updating ', _id, item);
      await model.update({ _id }, item);
    },
    async remove({ _id }) {
      console.log('Removing ', _id);
      await model.remove({ _id });
    }
  }
});
