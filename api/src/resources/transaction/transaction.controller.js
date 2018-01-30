const service = require('./transaction.service');

module.exports.addTransaction = async function getUser(ctx) {

  console.log(ctx.request.body);
  service.addTransaction(ctx.request.body);
  ctx.body = {
    ok: true,
  };
};
