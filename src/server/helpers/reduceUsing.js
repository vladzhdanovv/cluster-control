module.exports = (f, initial = {}) => items => items.reduce(f, initial);
