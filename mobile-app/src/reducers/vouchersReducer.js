
import Voucher from '../common/voucher.constants';

const vouchersReducer = (state = {
    balance: 0,
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
                      amount = (action.newStatus === Voucher.REDEEMED) ? 0 : voucher.amount;
                      walletBalance = (action.newStatus === Voucher.REFUNDED) ? walletBalance + voucher.amount : walletBalance;
                      email = (action.newStatus === Voucher.REFUNDED) ? Voucher.MY_EMAIL: action.email;
                      let historyItem = {
                        email: voucher.email,
                        status: voucher.status,
                        timeStamp: voucher.timeStamp
                      };
                      newVoucher.history = [...voucher.history, historyItem];
                      newVoucher.email = email;
                      return {
                        ...newVoucher,
                        status: action.newStatus,
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