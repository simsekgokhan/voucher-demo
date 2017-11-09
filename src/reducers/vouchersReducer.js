
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
        default:
            break;
    }
    return state;
};

export default vouchersReducer;