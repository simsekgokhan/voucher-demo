import io from 'socket.io-client';
import React from 'react';
import './layout.styles';
import Voucher from './components/voucher'

const socket = io('http://localhost:3001');

class Layout extends React.Component {
  state = {
    isVoucher: false,
  };
  componentWillMount() {
    const self = this;
    socket.on('eventClient', ({ id, amount, person, email, createdOn}) => {
      self.setState({
        isVoucher: true,
        amount,
        person,
        email,
        id,
        date: createdOn,
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
                ? <Voucher person={this.state.person} amount={this.state.amount} date={this.state.date} id={this.state.id} email={this.state.email}/>
                : null
            }
            <img className={this.state.isVoucher ? 'main__little-logo' : 'main__logo'} src="../../static/images/app-logo.png"/>
          </main>
        </div>
      </div>
    );
  }
}
export default Layout;
