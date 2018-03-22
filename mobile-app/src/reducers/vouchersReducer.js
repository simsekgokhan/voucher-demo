
import Voucher from '../common/voucher.constants';
import Vouchers from '../model/voucher.model';

const vouchersReducer = (state = {
    balance: 0,     // todo: rename to allVouchersBalance
    walletBalance: 100000,
    allVouchers: []
}, action) => {
    let walletBalance = state.walletBalance, email;
  switch (action.type) {
      case "ADD_VOUCHER":
            email = Voucher.RECEIVED_EMAIL;            
            if(action.payload.status === Voucher.PURCHASED) {
              email = Voucher.MY_EMAIL;
              if(state.walletBalance - action.payload.amount > 0) {
                walletBalance = walletBalance - action.payload.amount;
              } else {
                walletBalance = 0;
              }
            }

            action.payload.email = email;
            let historyItem = action.payload.history = {
                amount: action.payload.amount,
                email: email,
                status: action.payload.status,
                statusStr: Vouchers[action.payload.status].toString,
                timeStamp: action.payload.timeStamp
            };
            action.payload.history = [...action.payload.history, historyItem];         

            if(action.payload.status === Voucher.PURCHASED || 
               action.payload.status === Voucher.RECEIVED || 
               action.payload.status === Voucher.PAID) 
             {
                 action.payload.status = Voucher.ACTIVE;
                 action.payload.statusStr = Vouchers[Voucher.ACTIVE].toString;
             }
               
             state = {
                ...state,
                allVouchers: [...state.allVouchers, action.payload],
                balance: state.balance + action.payload.amount,
                walletBalance,
            };
            break;
        case "UPDATE_VOUCHER":
            let amount = 0;
            state = {
                ...state,
                allVouchers: state.allVouchers.map(voucher => {
                    if(voucher.id === action.id) {
                      let newVoucher = {...voucher};
                      // Do not change the balance when Redeem occurs
                      // todo.x: rename voucher.amount as voucher.balance 
                      if(action.newStatus === Voucher.PAID) 
                        amount = action.amount;
                      else
                        amount = (action.newStatus === Voucher.REDEEMED) ? 0 : voucher.amount;

                      walletBalance = (action.newStatus === Voucher.REFUNDED) ? walletBalance + voucher.amount 
                                                                              : walletBalance;
                      email = (action.newStatus === Voucher.REFUNDED) ? Voucher.MY_EMAIL: action.email;
                      let historyItem = {
                        amount: action.amount,
                        email: action.email,
                        status: action.newStatus,
                        statusStr: Vouchers[action.newStatus].toString,
                        timeStamp: action.newTimeStamp
                      };
                      if(action.newStatus === Voucher.PAID) 
                          newVoucher.amount -= action.amount;   // todo.x: rename to newVoucher.balance                           
                      
                      newVoucher.history = [...voucher.history, historyItem];
                      newVoucher.email = email;

                      if(action.newStatus === Voucher.PURCHASED || 
                         action.newStatus === Voucher.RECEIVED || 
                         action.newStatus === Voucher.PAID) 
                      {
                         action.newStatus = Voucher.ACTIVE;
                      }

                      return {
                        ...newVoucher,
                        status: action.newStatus,
                        statusStr: Vouchers[action.newStatus].toString,                        
                        timeStamp: action.newTimeStamp
                      }; 
                    }
                    else {
                      return voucher;
                    }
                }),
                walletBalance,
                balance: state.balance - amount,
            };
            break;               
        case "DELETE_ALL_VOUCHERS":
            state = {
                ...state,
                allVouchers: [],
                balance: 0,
                walletBalance: 0
            };
            break;                    
        default:
            break;
    }
    return state;
};

export default vouchersReducer;