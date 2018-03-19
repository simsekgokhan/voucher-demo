import io from 'socket.io-client';
import React from 'react';
import './layout.styles';
import Voucher from './components/voucher'

const socket = io('http://159.89.23.3:3001');

class Layout extends React.Component {
  // Todo: Move QR page div into a class 

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

    // Generate random value between 5-50
    let amount = Math.floor(Math.random() * 50);
    if (amount < 5)
      amount += 5;

    return (
      <div>
        <div className="container">
          <main className="main">
            {
              this.state.isVoucher
                ? 
                  <div style={styles.voucher}>
                    <Voucher person={this.state.person} amount={this.state.amount} 
                            date={this.state.date} id={this.state.id} email={this.state.email}/>
                  </div>         
                : 
                  <div className="qr" style={styles.qrPage}>
                    <header style={styles.qrHeader}>
                      <div style={styles.qrHeaderLeft}>
                        <img style={{height: '40px'}} src="../../static/images/pay.png" />
                        <a style={styles.qrHeaderText}> 
                          Pay with voucher
                        </a>
                      </div>
                      <div style={styles.visaLogo}>
                        <img style={{height: '22px'}} 
                            src="../../static/images/visa-logo.png" />
                      </div>
                    </header>
                    <img style={{height: '200px'}} src="../../static/images/qr-code.png" />
                    <p style={{margin: '40px'}}>
                      Please scan QR-code to pay the amount of {amount} USD
                    </p>                 
                  </div>                       
            }
            <img className="main__little-logo" src="../../static/images/app-logo.png"/>
            {
              this.state.isVoucher ?
                <button style={styles.refreshButton} onClick={() => this.setState({isVoucher: false})}> 
                  Refresh
                </button>  
              : null
            }
          </main>
 
        </div>
      </div>
    );
  }
}
export default Layout;

const styles = {
  voucher: { 
    width: '325px', 
    height: '475px', 
    marginTop: '60'
  },
  qrPage: {
    textAlign: 'center',
    height: '430px',     
  },
  qrHeader: {
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px'
  },
  qrHeaderLeft: {
    display: 'flex', 
    justifyContent: 'center'
  },
  qrHeaderText: {
    display: 'flex', 
    alignItems: 'center', 
    marginLeft: '10px',
  },
  visaLogo: {
    height: '40px',
    marginLeft: '140px',
    display: 'flex',
    alignItems: 'center',
  },
  refreshButton: {
    marginTop:'20px', 
    borderRadius: '25px', 
    border: 'none',
    height: '40px', 
    width: '100px', 
    color: '#33ccff',
    backgroundColor: "white",
    outline: 0
  }
};


