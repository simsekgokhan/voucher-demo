const cors = require('kcors');
const bodyParser = require('koa-bodyparser');
const helmet = require('koa-helmet');
const validate = require('koa-validate');
const requestLogger = require('koa-logger');
const serve = require('koa-static');
const mount = require('koa-mount');
const pathToUploads = require('config').pathToUploads;

const logger = global.logger;
const routes = require('./routes');


module.exports = (app) => {
  app.use(cors());
  app.use(helmet());
  app.use(bodyParser({ enableTypes: ['json', 'form', 'text'] }));
  app.use(requestLogger());
  app.use(mount('/uploads', serve(pathToUploads)));

  validate(app);

  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      logger.error(err);
      this.status = err.status || 500;
      this.body = {
        errors: [{ _global: 'An error has occurred' }],
      };
      this.app.emit('error', err, this);
    }
  });

  routes(app);
};
