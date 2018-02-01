import moment from 'moment';
import voucherConstants from '../common/voucher.constants'
import { addTransaction } from '../resources/transaction/transaction.api';

export function addVoucher(voucher) {
    if (voucher.qrScanned) {
        const email = voucherConstants.RECEIVED_EMAIL;
        const person = email.replace(/(\w+)\.(\w+).+$/, '$1 $2');
        addTransaction({
            id: voucher.id,
            amount: `${voucher.amount}`,
            email,
            person,
            date: voucher.timeStamp,
        });
    }
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
