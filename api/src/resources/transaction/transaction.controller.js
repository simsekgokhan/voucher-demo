const service = require('./transaction.service');

module.exports.addTransaction = async function getUser(ctx) {
  service.addTransaction(ctx.request.body);
  ctx.body = {
    ok: true,
  };
};
