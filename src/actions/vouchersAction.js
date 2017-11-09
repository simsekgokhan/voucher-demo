
export function setHasVoucher(status) {
    return {
        type: "SET_HAS_VOUCHER",
        payload: status
    };
}

export function addVoucher(amount) {
    return {
        type: "ADD_VOUCHER",
        payload: amount
    };
}
