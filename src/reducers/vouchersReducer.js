
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
            state = {
                ...state,
                allVouchers: state.allVouchers.map(voucher => 
                    (voucher.id === action.id) ?                    
                    { 
                      ...voucher, 
                      oldStatus: voucher.status, 
                      status: action.newStatus,
                      timeStamp: action.newTimeStamp
                    } 
                    : voucher),
                balance: state.balance - action.amount
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