const mount = require('koa-mount');
const userResource = require('resources/transaction/public');

module.exports = (app) => {
  app.use(mount('/api/transaction', userResource));
};
