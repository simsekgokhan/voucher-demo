import React from 'react';
import './voucher.styles';

class Voucher extends React.Component {
  render() {
    const hours = this.props.date.getHours();
    const minutes = this.props.date.getMinutes();
    const seconds= this.props.date.getSeconds();
    const time = `${hours <= 9 ? `0${hours}` : hours}:${minutes <= 9 ? `0${minutes}` : minutes}:${seconds <= 9 ? `0${seconds}` : seconds}`;
    return (
      <div className="voucher">
        <span className="voucher__amount">${this.props.amount}.00</span>
        <span className="voucher__receiver">{this.props.person}</span>
        <span className="voucher__date">{time}</span>
      </div>
    );
  }
}
export default Voucher;
