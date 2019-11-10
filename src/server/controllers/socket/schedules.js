const { schedules } = require('../../database');
const crud = require('./mixin/crud');

module.exports = crud(schedules);
