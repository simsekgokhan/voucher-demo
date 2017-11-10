
export function setHasVoucher(status) {
    return {
        type: "SET_HAS_VOUCHER",
        payload: status
    };
}

export function addVoucher(voucher) {
    return {
        type: "ADD_VOUCHER",
        payload: voucher
    };
}

export function updateVoucher(idAndNewStatus) {
    return {
        type: "UPDATE_VOUCHER",
        id: idAndNewStatus.id,
        payload: idAndNewStatus.newStatus
    };
}
