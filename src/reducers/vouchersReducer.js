
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
                    { ...voucher, oldStatus: voucher.status, status: action.newStatus } :                     
                    voucher),
                balance: state.balance - action.amount
            };
            break;                      
        default:
            break;
    }
    return state;
};

export default vouchersReducer;