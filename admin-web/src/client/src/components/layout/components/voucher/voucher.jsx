import React from 'react';
import './voucher.styles';
import moment from 'moment/moment';

class Voucher extends React.Component {
  render() {
    const time = moment(this.props.date).calendar({
      sameDay: `[Today], h:mm A`,
      lastDay: `[Yesterday], h:mm A`,
      sameElse: `DD-MM-YYYY,$h:mm A`,
    });
    return (
      <div className="voucher">
        <div className="voucher__header">
          <span className="voucher__id">Voucher #{this.props.id}</span>
          <img className="voucherVisa" src="../../../static/images/visa-logo.png"/>
        </div>
        <div className="voucher__label">
          <img className="voucher__label-img" src="../../../static/images/paid.png"/>
          <span className="voucher__label-text">Payment Confirmed</span>
        </div>
        <div className="voucher__person-info">
          <span className="voucher__receiver">{this.props.person}</span>
          <span className="voucher__email">{this.props.email}</span>
        </div>
        <span className="voucher__amount">$ {this.props.amount}.00</span>
        <span className="voucher__date">{time}</span>
      </div>
    );
  }
}
export default Voucher;
