
const Voucher = {
    // Voucher Actions
    REDEEM: 'Redeem',
    SEND: 'Send',
    RECEIVE: 'Receive',
    PURCHASE: 'Purchase',
    BUY: 'Buy',
    REFUND: 'Refund',
    PAY: 'Pay',
    
    // Voucher States 
    // todo: Currently, RECEIVED, PURCHASED and PAID are not voucher states.  
    //       They are transaction types.
    REDEEMED: 0,    
    SENT: 1,
    RECEIVED: 2,    // Todo: transaction type only
    PURCHASED: 3,   // Todo: transaction type only
    REFUNDED: 4,
    PAID: 5,        // Todo: transaction type only
    ACTIVE: 6,   

    // Voucher State Texts
    // todo: Currently, RECEIVED, PURCHASED and PAID are not voucher states.  
    //       They are transaction types.
    REDEEMED_TEXT: 'Redeemed',    
    SENT_TEXT: 'Sent',
    RECEIVED_TEXT: 'Received',
    PURCHASED_TEXT: 'Purchased',
    REFUNDED_TEXT: 'Refunded',
    PAID_TEXT: 'Paid by Voucher',   
    ACTIVE_TEXT: 'Active',   

    MY_EMAIL: 'Murray.Derek@hotmail.com',
    RECEIVED_EMAIL: 'Darlene.Buckalew@hotmail.com'
}

export default Voucher;
