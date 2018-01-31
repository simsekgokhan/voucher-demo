import io from 'socket.io-client';
import React from 'react';
import './layout.styles';
import Voucher from './components/voucher'

const socket = io('http://159.89.23.3:3001');

class Layout extends React.Component {
  state = {
    isVoucher: false,
  };
  componentWillMount() {
    const self = this;
    socket.on('eventClient', ({ amount, person, createdOn}) => {
      self.setState({
        isVoucher: true,
        amount,
        person,
        date: new Date(createdOn)
      });
    });
  }

  render() {
    return (
      <div>
        <div className="container">
          <main className="main">
            {
              this.state.isVoucher
                ? <Voucher person={this.state.person} amount={this.state.amount} date={this.state.date}/>
                : <img className="main__logo" src="../../static/images/app-logo.png"/>
            }
          </main>
        </div>
      </div>
    );
  }
}
export default Layout;
