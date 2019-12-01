const { commandsDatabase } = require('../../database');
const crud = require('./mixin/crud');

module.exports = crud(commandsDatabase);
