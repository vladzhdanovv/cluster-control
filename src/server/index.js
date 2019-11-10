const app = require('./setup/express');
if (process.env.NODE_ENV !== "production") require('./setup/webpack')(app);
const http = require('http');
const server = http.createServer(app);
require('./controllers/socket')(server);
server.listen(app.get('port'));
