const path = require('path');
const cors = require('kcors');
const requestLogger = require('koa-logger');
const serve = require('koa-static');
const mount = require('koa-mount');
// It is important to load webpack from client node modules,
// otherwise it can't find loaders relatively to the webpack
const webpack = require('../../client/node_modules/webpack');
const bodyParser = require('koa-bodyparser');
const views = require('koa-views');
const handlebars = require('handlebars');

const logger = global.logger;

// TODO: check koa-webpack-middleware for updates
const { devMiddleware, hotMiddleware } = require('../koa-webpack-middleware/middleware');
const webpackOptions = require('../../client/src/webpack.dev.config');
const routes = require('./routes');


handlebars.registerHelper('json', context => JSON.stringify(context));

const configureWebpack = (app) => {
  if (process.env.NODE_ENV === 'development') {
    const webpackMiddlewareOptions = {
      noInfo: false,
      quiet: false,
      hot: true,
      publicPath: webpackOptions.output.publicPath,
      stats: {
        colors: true,
      },
    };

    app.use(devMiddleware(webpack(webpackOptions), webpackMiddlewareOptions));
    app.use(hotMiddleware(webpack(webpackOptions)));
  }
};

const viewsPath = path.join(__dirname, './../../client/src');

module.exports = (app) => {
  app.use(cors());
  configureWebpack(app);
  app.use(requestLogger());
  app.use(bodyParser());

  app.use(views(viewsPath, {
    default: 'html',
    map: { html: 'handlebars' },
    options: {
      helpers: {
        json: ctx => JSON.stringify(ctx),
      },
    },
  }));

  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      logger.error(err);
      this.status = err.status || 500;
      this.body = {
        errors: [{ _global: 'An error has occurred' }],
      };
    }
  });

  app.use(routes);
  const pathToStatic = path.join(__dirname, './../../client/src/static');
  app.use(mount('/static', serve(pathToStatic)));
};
