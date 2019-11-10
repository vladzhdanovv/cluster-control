const { commands } = require('../../database');
const crud = require('./mixin/crud');

module.exports = crud(commands);
