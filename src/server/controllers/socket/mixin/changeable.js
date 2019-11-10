module.exports = client => ({
  async remove({ id }) {
    await client.remove(id);
  },
  async update({ id, patch }) {
    await client.edit(id, patch);
  },
  async create(data) {
    await client.add(data);
    //this.emit('new', instance.toObject());
  }
});