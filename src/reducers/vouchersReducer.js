
const vouchersReducer = (state = {
    hasVoucher: false,
    allVouchers: []
}, action) => {
    switch (action.type) {
        case "SET_HAS_VOUCHER":
            state = {
                ...state,
                hasVoucher: action.payload
            };
            break;
        case "ADD_VOUCHER":
            state = {
                ...state,
                allVouchers: [...state.allVouchers, action.payload]
            };
            break;      
        case "UPDATE_VOUCHER":
            state = {
                ...state,
                allVouchers: state.allVouchers.map(voucher => 
                    (voucher.id === action.id) ?                    
                    { ...voucher, status: action.payload } :                     
                    voucher)
            };
            break;                      
        default:
            break;
    }
    return state;
};

export default vouchersReducer;