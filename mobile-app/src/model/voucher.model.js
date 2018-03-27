import moment from 'moment';
import Voucher from '../common/voucher.constants';
import Color from '../common/colors';

let voucherId = 1200;

export function resetVoucherIds() {
  voucherId = 1200;
}

export function createVoucher(state, amount, timeStamp) {
  return { 
      id: voucherId++, 
      status: state,   // todo: rename to state
      statusStr: Vouchers[state].toString,
      timeStamp: timeStamp || moment().valueOf(),
      balance: amount,
      history: [],
    };    
}

export function createVoucherHistoryItem(amount, email, status, timeStamp) {
  return { 
    amount: amount,
    email: email,
    status: status, // todo: rename -> transactionType
    statusStr: Vouchers[status].toString,
    timeStamp: timeStamp
  };    
}

// todo: move to transaction.model
export function createTransaction(voucherId, transactionType, amount, email) {
  return { 
      voucherId: voucherId,
      transactionType: transactionType, 
      amount: amount,
      email: email,
      oldStatus: null      
    };    
}

export default Vouchers = [
  {
    toString: Voucher.REDEEMED_TEXT,     
    voucherColor: Color.REDEEMED,
    textColor: Color.BLUE,
  },  
  {
    toString: Voucher.SENT_TEXT,     
    voucherColor: Color.SENT,
    textColor: Color.RED,
  },  
  {
    toString: Voucher.RECEIVED_TEXT,     
    voucherColor: Color.RECEIVED,
    textColor: Color.GREEN,
  },  
  {
    toString: Voucher.PURCHASED_TEXT,     
    voucherColor: Color.PURCHASED,
    textColor: Color.GREEN,
  },  
  {
    toString: Voucher.REFUNDED_TEXT,     
    voucherColor: Color.REFUNDED,
    textColor: Color.PURPLE,
  },  
  {
    toString: Voucher.PAID_TEXT,     
    voucherColor: Color.PAID,
    textColor: Color.BLUE,
  },  
  {
    toString: Voucher.ACTIVE_TEXT,     
    voucherColor: Color.ACTIVE,
    textColor: Color.GREEN,
  },  
];
