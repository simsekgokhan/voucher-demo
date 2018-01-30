const transactionService = require('./resources/transaction/transaction.service');
module.exports = (server) => {
  const io = require('socket.io')(server);
  io.on('connection', (socket) => {
    transactionService.on('created', (data) => {
      socket.emit('eventClient', data.doc.value);
    })
  });
};
