import React, { Component } from 'react';
import { 
  StyleSheet, TextInput, Text, TouchableOpacity, View, Image
} from 'react-native';
import {connect} from "react-redux";

import Color from '../common/colors';
import Voucher from '../common/voucher.constants';
import VoucherDetails from '../screens/VoucherDetails';
import { addVoucher, updateVoucher } from "../actions/vouchersAction";
import { createVoucher, createVoucherWithId, getTime } from '../model/voucher.model';

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
    else if(confirmType === Voucher.SEND || confirmType === Voucher.REFUND){
      voucher = createVoucherWithId(this.props.id, voucherType, amount);       
      this.props.updateVoucher({
        id: this.props.id, 
        newStatus: voucherType, 
        newTimeStamp: getTime(),
        amount: amount
      });
    }
    
    this.props.navigator.push({
      screen: 'VoucherDetails',
      backButtonHidden: true,
      title: 'Voucher',
      passProps: {voucher}
    });    
  }

  render() {
    confirmType = this.props.confirmType;
    amount = this.props.amount;  
  
    let textColor = Color.BLUE;
    switch(confirmType) {
      case Voucher.BUY:
        voucherType = Voucher.PURCHASED;
        textColor = Color.BLUE;                
        break;      
      case Voucher.REDEEM:
        voucherType = Voucher.REDEEMED;
        textColor = Color.BLUE;
        break;
      case Voucher.SEND:
        voucherType = Voucher.SENT;
        textColor = Color.RED;
        break;
      case Voucher.REFUND:
        voucherType = Voucher.REFUNDED;
        textColor = Color.PURPLE;
        break;
      default:
        textColor = Color.BLUE;
        break;
    }      
        
    return (
      <View style={styles.container}>
        <View style={styles.block}>
          <Text style={{color: Color.TEXT_DEFAULT, fontSize: 18, marginTop: 50}}> 
            {confirmType} 
          </Text>
          <Text style={{color: textColor, fontSize: 24, marginTop: 6}}> 
            ${amount}.00
          </Text>          
          <TouchableOpacity 
            onPress={this.onTouchIdPressed}>
            <Image style={{marginTop: 70}}
              source={require('../images/touchId-button.png')}/>
          </TouchableOpacity>
          <Text style={{color: Color.TEXT_DEFAULT, fontSize: 18, marginTop: 30}}> 
            Touch ID for 
          </Text>          
          <Text style={{color: Color.TEXT_DEFAULT, fontSize: 18, marginTop: 4}}> 
            {leftQuoMark}Blockchain Vouchers{rightQuoMark}
          </Text>
          <Text style={{color: Color.TEXT_DEFAULT, fontSize: 14, marginTop: 14}}> 
            Please, confirm your fingerprint
          </Text>                    
        </View>        
      </View>
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
    marginVertical: 30, 
    alignItems: 'center',
    backgroundColor: Color.BACKGROUND_GREY,
  }
});