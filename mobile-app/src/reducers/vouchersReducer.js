
import Voucher from '../common/voucher.constants';
import Vouchers, { createVoucherHistoryItem } from '../model/voucher.model';

const vouchersReducer = (state = {
    balance: 0,  // balance(sum) of all vouchers
    walletBalance: 100000,
    allVouchers: []
}, action) => {
    let walletBalance = state.walletBalance, email;
    switch (action.type) {
        // Initial action.transactionType can be Voucher.PURCHASED or Voucher.RECEIVED. 
        // They both result with Voucher.ACTIVE voucher state.
        case "ADD_VOUCHER":
            if (action.payload.status === Voucher.PURCHASED) {   // todo: rename to action.transactionType
                email = Voucher.MY_EMAIL;
                walletBalance = (state.walletBalance - action.payload.balance > 0) 
                    ? (walletBalance - action.payload.balance) 
                    : 0;
            }
            else 
                email = Voucher.RECEIVED_EMAIL;            

            const historyItem = createVoucherHistoryItem(action.payload.balance, email,
                                                         action.payload.status, action.payload.timeStamp);
            action.payload.history = [...action.payload.history, historyItem];

            if (action.payload.status === Voucher.PURCHASED ||
                action.payload.status === Voucher.RECEIVED) 
            {
                action.payload.status = Voucher.ACTIVE;
                action.payload.statusStr = Vouchers[Voucher.ACTIVE].toString;
            }

            state = {
                ...state,
                allVouchers: [...state.allVouchers, action.payload],
                balance: state.balance + action.payload.balance,
                walletBalance,
            };
            break;
        case "UPDATE_VOUCHER":
            let amount = 0;
            state = {
                ...state,
                allVouchers: state.allVouchers.map(voucher => {
                    if (voucher.id === action.id) {
                        let newVoucher = { ...voucher };
                        // Do not change the balance when Redeem occurs
                        if (action.newStatus === Voucher.PAID)
                            amount = action.amount;
                        else
                            amount = (action.newStatus === Voucher.REDEEMED) ? 0 : voucher.balance;

                        walletBalance = (action.newStatus === Voucher.REFUNDED) ? walletBalance + voucher.balance
                                                                                : walletBalance;

                        if (action.newStatus === Voucher.REFUNDED || action.newStatus === Voucher.SENT ||
                            action.newStatus === Voucher.REDEEMED) 
                        {
                            action.amount = newVoucher.balance;
                        }

                        email = (action.newStatus === Voucher.REFUNDED) ? Voucher.MY_EMAIL : action.email;

                        const historyItem = createVoucherHistoryItem(action.amount, email, action.newStatus,
                                                                     action.newTimeStamp);
                        newVoucher.history = [...voucher.history, historyItem];

                        if (action.newStatus === Voucher.PAID)
                            newVoucher.balance -= action.amount;

                        newVoucher.email = email;

                        if (action.newStatus === Voucher.PURCHASED || action.newStatus === Voucher.RECEIVED ||
                            action.newStatus === Voucher.PAID) 
                        {
                            action.newStatus = Voucher.ACTIVE;
                        }

                        if (action.newStatus === Voucher.ACTIVE && newVoucher.balance === 0)
                            action.newStatus = Voucher.REDEEMED;

                        return {
                            ...newVoucher,
                            status: action.newStatus,
                            statusStr: Vouchers[action.newStatus].toString,
                            timeStamp: action.newTimeStamp
                        };
                    }
                    else {
                        return voucher;
                    }
                }),
                walletBalance,
                balance: state.balance - amount,
            };
            break;
        case "DELETE_ALL_VOUCHERS":
            state = {
                ...state,
                allVouchers: [],
                balance: 0,
                walletBalance: 0
            };
            break;
        default:
            break;
    }
    return state;
};

export default vouchersReducer;