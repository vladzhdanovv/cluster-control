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
    async update({ id, item }) {
      await model.update({ id }, item);
    },
    async remove({ id }) {
      await model.remove({ id });
    }
  }
});
