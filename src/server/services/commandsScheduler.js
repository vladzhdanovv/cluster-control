const nodeSchedule = require('node-schedule');
const { schedulesDatabase } = require('../database');
const runSchedule = require('../commands/schedule/run');

const jobs = {};

const getCronTime = time => time.split(':').reduce((result, timeUnit) => `${timeUnit} ${result}`, '* * *');

module.exports = {
  add({_id, time}) {
    console.log(`adding ${_id} schedule running at ${time}`);

    if (jobs[_id]) jobs[_id].cancel();

    const cronTime = getCronTime(time);
    jobs[_id] = nodeSchedule.scheduleJob(cronTime, () => schedulesDatabase.findOne({_id}).then(runSchedule));
  },
  remove: _id => {
    jobs[_id].cancel();
    delete jobs[_id];
  },
};
