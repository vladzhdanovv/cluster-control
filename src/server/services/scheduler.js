const nodeSchedule = require('node-schedule');

const jobs = {};

const getScheduleKey = ({ time, isGlobal, servers, command: { name, command } }) =>
  `${time}:${isGlobal.toString()}:${!isGlobal && servers.join('/')}:${name}:${command}`;

const launchJobs = schedules => schedules.forEach(schedule => {
  const key = getScheduleKey(schedule);
  const cronTime = getCronTime(schedule.time);
  jobs[key] = jobs[key] || nodeSchedule.scheduleJob()
});

module.exports = {

};
