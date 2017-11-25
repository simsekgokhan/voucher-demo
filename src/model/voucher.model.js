
import { getTime } from '../common/time'

let voucherId = 1200;

export function resetVoucherIds() {
  voucherId = 1200;
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