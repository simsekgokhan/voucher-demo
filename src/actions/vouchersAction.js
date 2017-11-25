
import { getTime } from '../common/time';

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
        newTimeStamp: getTime(),
    };
}

export function deleteAllVouchers() {       
    return {
        type: "DELETE_ALL_VOUCHERS",
        payload: null, 
    };
}
