import React, { Component } from 'react';
import { 
  StyleSheet, TextInput, Text, TouchableOpacity, View, Image
} from 'react-native';
import {connect} from "react-redux";
import LinearGradient from 'react-native-linear-gradient';

import Color from '../common/colors';
import { playSound } from '../common/sounds';
import Voucher from '../common/voucher.constants';
import VoucherDetails from '../screens/VoucherDetails';
import { addVoucher, updateVoucher } from "../actions/vouchersAction";
import { createVoucher, createVoucherWithId } from '../model/voucher.model';
import { addTransaction } from '../resources/transaction/transaction.api';
import voucherConstants from '../common/voucher.constants'

const leftQuoMark = '\u00AB';
const rightQuoMark = '\u00BB';

let voucherType = '';
let confirmType = '';
let amount = 0;

class ConfirmScreen extends Component<{}> {

  onTouchIdPressed = () => {
    let voucher;      
    if(confirmType === Voucher.BUY){
      voucher = createVoucher(voucherType, amount);
      this.props.addVoucher(voucher); 
    } 
    else if(confirmType === Voucher.SEND || confirmType === Voucher.REFUND) {
      voucher = createVoucherWithId(this.props.id, voucherType, amount);
      voucher.email = this.props.email ? this.props.email : Voucher.MY_EMAIL;
      this.props.updateVoucher({ 
        id: this.props.id, newStatus: voucherType, email: this.props.email 
      });
    }
    else if(confirmType === Voucher.PAY) {
      const email = voucherConstants.MY_EMAIL;
      const person = email.replace(/(\w+)\.(\w+).+$/, '$1 $2');
      voucher = createVoucherWithId(this.props.id, voucherType, amount);
      voucher.email = this.props.email ? this.props.email : Voucher.MY_EMAIL;
      this.props.updateVoucher({ 
        id: this.props.id, amount: amount, newStatus: voucherType, email: email 
      });

      addTransaction({
        id: voucher.id,
        amount: `${voucher.amount}`,
        email,
        person,
        date: voucher.timeStamp,
      });
    }
    
    this.props.navigator.push({
      screen: 'VoucherDetails',
      backButtonHidden: true,
      title: 'Voucher',
      passProps: {voucher}
    });

    playSound();
  }

  render() {
    confirmType = this.props.confirmType;
    amount = this.props.amount;  
  
    let voucherColor = Color.REDEEMED;
    let textColor = Color.BLUE;
    switch(confirmType) {
      case Voucher.BUY:
        voucherType = Voucher.PURCHASED;
        voucherColor = Color.PURCHASED;
        textColor = Color.BLUE;                
        break;      
      case Voucher.PAY:
        voucherType = Voucher.PAID;
        voucherColor = Color.PAID;
        textColor = Color.BLUE;                
        break;      
      case Voucher.REDEEM:
        voucherType = Voucher.REDEEMED;
        voucherColor = Color.REDEEMED;
        textColor = Color.BLUE;
        break;
      case Voucher.SEND:
        voucherType = Voucher.SENT;
        voucherColor = Color.SENT;
        textColor = Color.RED;
        break;
      case Voucher.REFUND:
        voucherType = Voucher.REFUNDED;
        voucherColor = Color.REFUNDED;
        textColor = Color.PURPLE;
        break;
      default:
        voucherType = Voucher.REDEEMED;
        voucherColor = Color.REDEEMED;
        textColor = Color.BLUE;
        break;
    }      
        
    return (
      <Image style={styles.container}
        resizeMode='cover' 
        source={require('../images/background.png')}>  
        <LinearGradient style={styles.block}
          start={[0, 0]} end={[1, 0]}
          colors={[Color.VOUCHER_SECOND_COLOR, voucherColor]}>        
          <Text style={styles.confirmTypeText}> 
            {confirmType} 
          </Text>
          <Text style={[styles.amount, {color: textColor}]}> 
            ${amount}.00
          </Text>          
          <TouchableOpacity 
            onPress={this.onTouchIdPressed}>
            <Image style={{marginTop: 70}}
              source={require('../images/touchid-button.png')}/>
          </TouchableOpacity>
          <Text style={styles.touchIdText}> 
            Touch ID for {leftQuoMark}PlipMe{rightQuoMark}
          </Text>
          <Text style={styles.pleaseConfirmText}> 
            Please, confirm your fingerprint
          </Text>                    
        </LinearGradient>        
      </Image>
    );
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateVoucher: (state) => {
      dispatch(updateVoucher(state));      
    },
    addVoucher: (state) => {
      dispatch(addVoucher(state));      
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BACKGROUND,
  },
  block: {
    flex: 1,
    marginHorizontal: 20, 
    marginTop: 30, 
    marginBottom: 40, 
    alignItems: 'center',
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: 'grey',
    shadowOffset: { height: 0, width: 0 },
  },
  confirmTypeText: {
    color: Color.TEXT_DEFAULT, 
    backgroundColor: Color.TRANSPARENT, 
    fontSize: 18, 
    marginTop: 50
  },
  amount: {     
    backgroundColor: Color.TRANSPARENT, 
    fontSize: 24, 
    marginTop: 6
  },
  touchIdText: {
    color: Color.TEXT_DEFAULT, 
    backgroundColor: Color.TRANSPARENT, 
    fontSize: 18, 
    marginTop: 30
  },
  pleaseConfirmText: {
    color: Color.TEXT_GREY_DARK, 
    backgroundColor: Color.TRANSPARENT, 
    fontSize: 14, 
    marginTop: 14
  }
});
