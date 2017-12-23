
import Voucher from '../common/voucher.constants';

const vouchersReducer = (state = {
    balance: 0,
    walletBalance: 1000,
    allVouchers: []
}, action) => {
    let walletBalance = state.walletBalance;
    switch (action.type) {
        case "ADD_VOUCHER":
            if(state.walletBalance - action.payload.amount > 0) {
                walletBalance = walletBalance - action.payload.amount;
            } else {
                walletBalance = 0;
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
                      // Do not change the balance when Redeem occurs  
                      amount = (action.newStatus === Voucher.REDEEMED) ? 0 : voucher.amount;
                      walletBalance = (action.newStatus === Voucher.REFUNDED) ? walletBalance + voucher.amount : walletBalance;
                      return {
                        ...voucher, 
                        oldStatus: voucher.status, 
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