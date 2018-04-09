import React, { Component } from 'react';
import { 
  StyleSheet, Text, TouchableOpacity, View, Image
} from 'react-native';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from "react-redux";
import Color from '../common/colors';
import { getTime } from '../common/time';
import Voucher from '../common/voucher.constants';
import Vouchers from '../model/voucher.model';

let voucherId;    
let voucherType;  // todo: currently used as voucher status and transaction type
let email;
let timeStamp;
let amount;      // todo: currently used as voucher balance and transaction amount

class VoucherDetails extends React.Component {

  state = {
    sendModal: false,
  }

  // For react-native-navigation  
  static navigatorStyle= {
    tabBarHidden: false,
    navBarButtonColor: Color.WHITE,    
  }  

  navigateToConfirm = (confirmType) => { 
    this.props.navigator.push({
      screen: 'ConfirmScreen',
      title: confirmType,
      backButtonTitle: 'Cancel',
      passProps: {
        id: voucherId,
        confirmType: confirmType, 
        amount: amount,           
      },
    });    
  }

  onQrSendPress = () => {
    this.setState({
      sendModal: false
    });
    this.props.navigator.push({
      screen: 'ShareOnEmail',
      title: 'Share On Email',
      backButtonTitle: 'Back',
      navigatorButtons: {
        rightButtons: [{
          id: 'send',
          title: 'Send',
        }]
      },
      passProps: {
        id: voucherId,
        confirmType: Voucher.SENT,
        amount: amount
      },
    });
  };

  onCancelPress = () => {
    this.setState({
      sendModal: false
    })
  };

  onPayPress = () => {
    this.props.navigator.push({
      screen: 'Scan',
      title: 'Scan QR-Code' ,
      backButtonTitle: 'Back',
      navigatorStyle: {
        tabBarHidden: true,          
        navBarButtonColor: Color.WHITE,
        drawUnderTabBar: true,          
      },
      passProps: {
        id: voucherId,
        amount: amount
      },
    });    
  };

  onSendPress = () => {
    this.setState({
      sendModal: true
    })
  };
  
  onRefundPress = () => {
    this.navigateToConfirm(Voucher.REFUND);
  };

  render() {
    console.log('zzz: VD: this.props: ', this.props);

    // todo: Implement a seperate screen such as TransactionResult.
    //       Currently, this screen is used both as VoucherDetails and TransactionResult purposes
    if(this.props.transaction === undefined) { // VoucherDetails screen
      voucherId = this.props.voucher.id;
      voucherType = this.props.voucher.status;
      email = this.props.voucher.email;      
      timeStamp = this.props.voucher.timeStamp;      
      const allVouchers = this.props.vouchers.allVouchers;    
      // Todo: Currently voucher IDs start from 1200, start from 0 or 1000 in the future
      const initialBalance = allVouchers[this.props.voucher.id-1200].history[0].amount;
      const voucherBalance = this.props.voucher.balance;
      amount = (this.props.voucher.status === Voucher.REDEEMED) ? initialBalance : voucherBalance;     
    }
    else {  // TransactionResult screen
      voucherId = this.props.transaction.voucherId;
      voucherType = this.props.transaction.transactionType;      
      email = this.props.transaction.email;
      timeStamp = this.props.transaction.timeStamp;      
      amount = this.props.transaction.amount;
    }

    const amountText = ('$' + amount + '.00');    
    let name = email.replace(/(\w+)\.(\w+).+$/, '$1 $2');    
    let voucherColor = Color.REDEEMED;
    let voucherLogo = require('../images/redeemed.png');
    let textColor = Color.BLUE;
    let showButtons = false;

    switch(voucherType) {
      case Voucher.REDEEMED:
        voucherColor = Color.REDEEMED;
        voucherLogo = require('../images/redeemed.png');
        textColor = Color.BLUE;
        break;
      case Voucher.PAID:
        voucherColor = Color.PAID;
        voucherLogo = require('../images/paid.png');
        textColor = Color.BLUE;
        break;        
      case Voucher.SENT:
        voucherColor = Color.SENT;
        voucherLogo = require('../images/sent.png');
        textColor = Color.RED;
        break;
      case Voucher.PURCHASED:
        voucherColor = Color.PURCHASED;
        voucherLogo = require('../images/purchased.png');
        textColor = Color.GREEN;
        showButtons = true;
        break;
      case Voucher.RECEIVED:
        voucherColor = Color.RECEIVED;
        voucherLogo = require('../images/received.png');
        textColor = Color.GREEN;
        showButtons = true;
        break;
      case Voucher.REFUNDED:
        voucherColor = Color.REFUNDED;
        voucherLogo = require('../images/refunded.png');
        textColor = Color.PURPLE;
        break;        
      case Voucher.ACTIVE:
        voucherColor = Color.ACTIVE;
        voucherLogo = require('../images/purchased.png');
        textColor = Color.GREEN;
        showButtons = true; 
        break;
      default:
        voucherColor = Color.REDEEMED;
        textColor = Color.BLUE;
        break;
    }      

    return (
      <Image style={styles.container}
        resizeMode='cover' 
        source={require('../images/background.png')}>  
        <LinearGradient style={styles.voucherView}
          start={[0, 0]} end={[1, 0]}
          colors={[Color.VOUCHER_SECOND_COLOR, voucherColor]}>
          <View style={styles.voucherRow}>
            <Text style={[styles.voucherText, {marginTop: 6}]}> 
              Voucher #{voucherId}
            </Text>
            <Image source={require('../images/visa-logo-my-wallet.png')}/>    
          </View>
          <View style={styles.voucherLogoView}>
            <Image source={voucherLogo}/>                    
            <Text style={[styles.voucherStatusText, {color: textColor}]}> 
              {
                voucherType === Voucher.PAID ? 'Payment Confirmed' 
                                             : Vouchers[voucherType].toString
              }
            </Text>            
          </View>  
          <View style={[styles.voucherRow, {marginTop: 30}]}>
            <Text style={styles.voucherText}> 
              {name} 
            </Text>
          </View>
          <View style={styles.voucherRow}>
            <Text style={styles.voucherText}> 
              {email}
            </Text>
          </View>
          <View style={[styles.voucherRow, {marginTop: 20}]}>
            <Text style={styles.voucherText}>
              {`of  `} 
              <Text style={styles.amountText}> 
                {amountText}
              </Text>
            </Text>
          </View>
          {
            showButtons ? 
            <View style={[styles.voucherRow, {marginTop: 40}]}>
              <TouchableOpacity style={[styles.button, {width: 104, height: 38}]}
                onPress={this.onPayPress}>
                <Image source={require('../images/pay.png')}/>                
                <Text style={[styles.buttonText, {color: Color.GREEN}]}>
                  Pay
                </Text>
              </TouchableOpacity>               
              <TouchableOpacity style={[styles.button, {width: 104, height: 38, marginHorizontal: 4}]}
                onPress={this.onSendPress}>
                <Image source={require('../images/send.png')}/>
                <Text style={[styles.buttonText, {color: Color.RED}]}>
                  Send
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, {width: 104, height: 38}]}
                onPress={this.onRefundPress}>
                <Image source={require('../images/refund.png')}/>
                <Text style={[styles.buttonText, {color: Color.PURPLE}]}>
                  Refund
                </Text>
              </TouchableOpacity>            
            </View>
            : 
            null
          }
          <View style={styles.footerText}>
            <Text style={styles.voucherText}>
              { getTime(timeStamp, this.props.timeFormat) }
            </Text>
          </View>
        </LinearGradient>
        <Modal isVisible={this.state.sendModal}>
          <View style={styles.modalMainContainer}>
            <LinearGradient
              start={[0, 0]} end={[1, 0]}
              colors={['#ffffff', '#ccf2ff']}
              style={styles.modalContainer}>
              <View style={styles.modalQr}>
                <Text style={styles.modalQrText}>
                  Send QR Code
                </Text>
                <Image
                  style={styles.modalQrImage}
                  source={require('../images/qr-code.png')}/>
              </View>
              <TouchableOpacity
                onPress={this.onQrSendPress}
                style={styles.modalSend}>
                <Image source={require('../images/send.png')}/>
                <Text style={[styles.buttonText, {color: Color.RED}]}>
                  Send
                </Text>
              </TouchableOpacity>
            </LinearGradient>
            <TouchableOpacity
              onPress={this.onCancelPress}
              style={styles.modalCancel}>
              <Text style={styles.textCancel}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </Image>     
    );
  }
}

export default connect((state) => {
  return {
    timeFormat: state.app.timeFormat,
    vouchers: state.vouchers
  }
})(VoucherDetails);

const styles = StyleSheet.create({
  container: {
  },
  textCancel: {
    fontSize: 20,
    color: '#007aff',
  },
  modalMainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    height: 474,
    borderRadius: 14,
    backgroundColor: '#000000',
    marginBottom: 15,
  },
  modalCancel: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
  },
  modalSend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
  },
  modalQr: {
    height: 418,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#3f3f3f',
    borderBottomWidth: 0.5,
  },
  modalQrImage: {
    marginTop: 31,
  },
  modalQrText: {
    backgroundColor: 'transparent',
    fontSize: 13,
    color: '#828282',
  },
  voucherView: {
    marginHorizontal: 8,
    marginTop: 24,
    marginBottom: 134,
    padding: 14,
    borderRadius: 5,    
    flex: 1,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: 'grey',
    shadowOffset: { height: 0, width: 0 },
  },
  voucherLogoView: {
    flexDirection: 'row',    
    marginTop: 30,
    alignItems: 'center',
  },
  voucher: {
    margin: 15,
  },
  voucherRow: {
    flexDirection: 'row',    
    padding: 3,
    alignItems: 'center',
    justifyContent: 'space-between', 
  },
  voucherText: {
    color: Color.TEXT_DEFAULT, 
    backgroundColor: 'transparent',
    fontSize: 18,
  },
  voucherStatusText: {     
    backgroundColor: 'transparent',
    marginLeft: 15, 
    fontSize: 20
  },
  amountText: {
    color: Color.BLUE, 
    fontSize: 32, 
    paddingLeft: 20
  },
  button: {
    backgroundColor: '#ccdfe5', 
    borderRadius: 20, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',     
    paddingHorizontal: 4,      
    padding: 8,          
  },
  buttonText: {
    backgroundColor: 'transparent',
    fontSize: 18,
    paddingHorizontal: 4
  },
  footerText: {
    position: 'absolute', 
    top: 430, 
    bottom: 0,         
    left: 24, 
    right: 0, 
  },    
});

  
  
  
  