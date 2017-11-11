
export function addVoucher(voucher) {
    return {
        type: "ADD_VOUCHER",
        payload: voucher, 
    };
}

export function updateVoucher(voucher) {
    return {
        type: "UPDATE_VOUCHER",
        id: voucher.id,
        newStatus: voucher.newStatus,
        newTimeStamp: voucher.newTimeStamp,
        amount: voucher.amount
    };
}
