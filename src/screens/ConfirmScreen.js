import React, { Component } from 'react';
import { 
  StyleSheet, TextInput, Text, TouchableOpacity, View, Image
} from 'react-native';
import {connect} from "react-redux";
import LinearGradient from 'react-native-linear-gradient';

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
  
    let voucherColor = Color.DARK_BLUE;
    let textColor = Color.BLUE;
    switch(confirmType) {
      case Voucher.BUY:
        voucherType = Voucher.PURCHASED;
        voucherColor = Color.DARK_GREEN;
        textColor = Color.BLUE;                
        break;      
      case Voucher.REDEEM:
        voucherType = Voucher.REDEEMED;
        voucherColor = Color.DARK_BLUE;
        textColor = Color.BLUE;
        break;
      case Voucher.SEND:
        voucherType = Voucher.SENT;
        voucherColor = Color.DARK_RED;
        textColor = Color.RED;
        break;
      case Voucher.REFUND:
        voucherType = Voucher.REFUNDED;
        voucherColor = Color.DARK_PURPLE;
        textColor = Color.PURPLE;
        break;
      default:
        voucherType = Voucher.REDEEMED;
        voucherColor = Color.DARK_BLUE;
        textColor = Color.BLUE;
        break;
    }      
        
    return (
      <View style={styles.container}>
        <LinearGradient style={styles.block}
          start={[0, 0]} end={[1, 0]}
          colors={[Color.VOUCHER_SECOND_COLOR, voucherColor]}>        
          <Text style={{color: Color.TEXT_DEFAULT, backgroundColor: 'transparent', fontSize: 18, marginTop: 50}}> 
            {confirmType} 
          </Text>
          <Text style={{color: textColor, backgroundColor: 'transparent', fontSize: 24, marginTop: 6}}> 
            ${amount}.00
          </Text>          
          <TouchableOpacity 
            onPress={this.onTouchIdPressed}>
            <Image style={{marginTop: 70}}
              source={require('../images/touchId-button.png')}/>
          </TouchableOpacity>
          <Text style={{color: Color.TEXT_DEFAULT, backgroundColor: 'transparent', fontSize: 18, marginTop: 30}}> 
            Touch ID for {leftQuoMark}PlipMe{rightQuoMark}
          </Text>
          <Text style={{color: Color.TEXT_GREY_DARK, backgroundColor: 'transparent', sfontSize: 14, marginTop: 14}}> 
            Please, confirm your fingerprint
          </Text>                    
        </LinearGradient>        
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
    //backgroundColor: Color.TEXT_GREY,
  }
});