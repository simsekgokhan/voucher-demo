const controller = require('./transaction.controller');
const router = require('koa-router')();

router.post('/', controller.addTransaction);

module.exports = router.routes();

