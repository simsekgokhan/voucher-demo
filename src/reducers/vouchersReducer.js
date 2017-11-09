
const vouchersReducer = (state = {
    hasVoucher: false,
}, action) => {
    switch (action.type) {
        case "SET_HAS_VOUCHER":
            state = {
                ...state,
                hasVoucher: action.payload
            };
            break;
        default:
            break;
    }
    return state;
};

export default vouchersReducer;