const db = require('db');
const schema = require('./transaction.schema');
const service = db.createService('transaction', schema);


service.addTransaction = async (transaction) => {
  service.create(transaction);
};

module.exports = service;
