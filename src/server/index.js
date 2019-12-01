const app = require('./setup/express');
const { schedulesDatabase } = require('./database');
const commandsScheduler = require('./services/commandsScheduler');
if (process.env.NODE_ENV !== "production") require('./setup/webpack')(app);
const http = require('http');
const server = http.createServer(app);
require('./controllers/socket')(server).then((io) => app.set('io', io));
schedulesDatabase.find({}).then(schedules => schedules.forEach(schedule => commandsScheduler.add(schedule)));
server.listen(app.get('port'));
