// allows require modules relative to /src folder
// for example: require('lib/mongo/idGenerator')
// all options can be found here: https://gist.github.com/branneman/8048520
require('app-module-path').addPath(__dirname);
global.logger = require('logger');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const logger = global.logger;
const config = require('config');
const Koa = require('koa');

const app = new Koa();

require('./config/koa')(app);

const server = app.listen(config.port, () => {
  logger.warn(`Api server listening on ${config.port}, in ${process.env.NODE_ENV} mode`);
});

require('./socketServer')(server);


module.exports = app;
