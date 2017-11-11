

function randomIntFromInterval(min,max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}

export function createVoucher(status, amount) {
  return { 
      id: randomIntFromInterval(1000,9999), 
      status: status, 
      amount: amount,
      oldStatus: null
    };    
}

export function createVoucherWithId(id, status, amount) {
  return { 
      id: id, 
      status: status, 
      amount: amount,
      oldStatus: null      
    };    
}