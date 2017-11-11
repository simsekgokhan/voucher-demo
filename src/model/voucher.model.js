
let voucherId = 1200;

let minute = 10;
let hour = 2;
export function getTime(){
  minute += 4;

  if(minute > 59) {
    hour += 1;  
    minute = 10;
  }
  
  if(hour > 12)
    hour = 1;

  return hour + ':' + minute;  
}

export function createVoucher(status, amount) {
  return { 
      id: voucherId++, 
      status: status,
      timeStamp: getTime(),
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