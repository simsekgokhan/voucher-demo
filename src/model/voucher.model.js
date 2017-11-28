
import { getTime } from '../common/time'
import Voucher from '../common/voucher.constants';
import Color from '../common/colors';

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

export default Vouchers = [
  {
    toString: Voucher.REDEEMED_TEXT, 
    voucherColor: Color.REDEEMED,
    textColor: Color.BLUE,
    amountSign: '',
  },  
  {
    toString: Voucher.SENT_TEXT,     
    voucherColor: Color.SENT,
    textColor: Color.RED,
    amountSign: '',
  },  
  {
    toString: Voucher.RECEIVED_TEXT,     
    voucherColor: Color.RECEIVED,
    textColor: Color.GREEN,
    amountSign: '',
  },  
  {
    toString: Voucher.PURCHASED_TEXT,     
    voucherColor: Color.PURCHASED,
    textColor: Color.GREEN,
    amountSign: '',
  },  
  {
    toString: Voucher.REFUNDED_TEXT,     
    voucherColor: Color.REFUNDED,
    textColor: Color.PURPLE,
    amountSign: '',
  },  
];
