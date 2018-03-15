import moment from 'moment';

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
        newTimeStamp: voucher.timeStamp || moment().valueOf(),
        email: voucher.email,
    };
}

export function deleteAllVouchers() {
    return {
        type: "DELETE_ALL_VOUCHERS",
        payload: null,
    };
}
