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
        id: this.props.voucher.id,
        confirmType: confirmType, 
        amount: this.props.voucher.amount,           
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
        id: this.props.voucher.id,
        confirmType: Voucher.SENT,
        amount: this.props.voucher.amount
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
        id: this.props.voucher.id,
        amount: this.props.voucher.amount
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
    const voucherStatus = this.props.voucher.status;                     
    const transactionType = this.props.transactionType;                     

    // todo: Implement a seperate screen for confirmed transaction.
    //       Currently, this screen is used as both VoucherDetails and TransactionDetails
    const voucherType = (transactionType === undefined) ? voucherStatus : transactionType;

    let voucherColor = Color.REDEEMED;
    let voucherLogo = require('../images/redeemed.png');
    let textColor = Color.BLUE;
    let showButtons = false;
    let email = this.props.voucher.email;
    let name = email.replace(/(\w+)\.(\w+).+$/, '$1 $2');

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
        showButtons = true;        
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
              Voucher #{this.props.voucher.id}
            </Text>
            <Image source={require('../images/visa-logo-my-wallet.png')}/>    
          </View>
          <View style={styles.voucherLogoView}>
            <Image source={voucherLogo}/>                    
            <Text style={[styles.voucherStatusText, {color: textColor}]}> 
              {
                transactionType === Voucher.PAID ? 'Payment Confirmed' : 
                Vouchers[voucherType].toString
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
                $ {this.props.voucher.amount}.00 
              </Text>
            </Text>
          </View>
          {
            showButtons ? 
            <View style={[styles.voucherRow, {marginTop: 30}]}>
              <TouchableOpacity style={[styles.button, {width: 88, height: 38}]}
                onPress={this.onPayPress}>
                <Image source={require('../images/pay.png')}/>                
                <Text style={[styles.buttonText, {color: Color.BLUE}]}>
                  Pay
                </Text>
              </TouchableOpacity>               
              <TouchableOpacity style={[styles.button, {width: 96, marginHorizontal: 4}]}
                onPress={this.onSendPress}>
                <Image source={require('../images/send.png')}/>
                <Text style={[styles.buttonText, {color: Color.RED}]}>
                  Send
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, {width: 108}]}
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
              { getTime(this.props.voucher.timeStamp, this.props.timeFormat) }
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
    marginHorizontal: 15,
    marginTop: 30,
    marginBottom: 154,
    padding: 18,
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
    backgroundColor: '#eaf2f5', 
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

  
  
  
  