
import Voucher from '../common/voucher.constants';

const vouchersReducer = (state = {
    balance: 0,
    allVouchers: []
}, action) => {
    switch (action.type) {
        case "ADD_VOUCHER":
            state = {
                ...state,
                allVouchers: [...state.allVouchers, action.payload],
                balance: state.balance + action.payload.amount                          
            };
            break;      
        case "UPDATE_VOUCHER":
            let amount = 0;
            state = {
                ...state,
                allVouchers: state.allVouchers.map(voucher => {
                    if(voucher.id === action.id) {
                      // Do not change the balance when Redeemed action occurs  
                      amount = (action.newStatus === Voucher.REDEEMED) ? 0 : voucher.amount;
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
                balance: state.balance - amount
            };
            break;               
        case "DELETE_ALL_VOUCHERS":
            state = {
                ...state,
                allVouchers: [],
                balance: 0                          
            };
            break;                    
        default:
            break;
    }
    return state;
};

export default vouchersReducer;