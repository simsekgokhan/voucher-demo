import React, { Component } from 'react';
import { 
  StyleSheet, TextInput, Text, TouchableOpacity, View, Image
} from 'react-native';
import {connect} from "react-redux";

import color from '../common/colors';
import Voucher from '../common/voucher.constants';
import VoucherDetails from '../screens/VoucherDetails';
import { addVoucher, updateVoucher } from "../actions/vouchersAction";
import { createVoucher, createVoucherWithId, getTime } from '../model/voucher.model';

let voucherType = '';
let confirmType = '';
let amount = 0;

class ConfirmScreen extends Component<{}> {

  constructor(props) {
    super(props);    
  }

  // For react-navigation
  static navigationOptions = ({ navigation })  => ({
    // title is passed to child (or comes from parent)
    title: navigation.state.params.confirmType, 
    headerTintColor: color.BLUE,
  });

  onTouchIdPressed = () => {            
    // a) When 'this' created/pushed by react-navigation stack navigation 
    if(this.props.navigation) {    
      const { navigate } = this.props.navigation;    
      navigate('VoucherDetails', {voucherType: voucherType});    
    }
    // b) When 'this' created/pushed by react-native-navigation    
    else if (this.props.navigator) {      
      
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
  }

  render() {
    const leftQuoMark = '\u00AB';
    const rightQuoMark = '\u00BB';
    
    // a) When 'this' created/pushed by react-navigation stack navigation 
    if(this.props.navigation) {    
      const { params } = this.props.navigation.state;    
      confirmType = params.confirmType;
      amount = params.amount;  
    }
    // b) When 'this' created/pushed by react-native-navigation    
    else if (this.props.navigator) {
      confirmType = this.props.confirmType;
      amount = this.props.amount;  
    }

    let textColor = color.BLUE;
    switch(confirmType) {
      case Voucher.BUY:
        voucherType = Voucher.PURCHASED;
        textColor = color.BLUE;                
        break;      
      case Voucher.REDEEM:
        textColor = color.BLUE;
        voucherType = Voucher.REDEEMED;
        break;
      case Voucher.SEND:
        textColor = color.RED;
        voucherType = Voucher.SENT;
        break;
      case Voucher.REFUND:
        textColor = color.PURPLE;
        voucherType = Voucher.REFUNDED;
        break;
      default:
        textColor = color.BLUE;
        break;
    }      
        
    return (
      <View style={styles.container}>
        <View style={styles.block}>
          <Text style={{color: 'white', fontSize: 18, marginTop: 50}}> 
            {confirmType} 
          </Text>
          <Text style={{color: textColor, fontSize: 24, marginTop: 4}}> 
            ${amount} 
          </Text>
          
          <TouchableOpacity onPress={this.onTouchIdPressed}>
          <Image                      
            style={{marginTop: 70}}
            source={require('../images/touchId-button.png')}/>
          </TouchableOpacity>

          <Text style={{color: 'white', fontSize: 18, marginTop: 30}}> 
            Touch ID for 
          </Text>          
          <Text style={{color: 'white', fontSize: 18, marginTop: 4}}> 
            {leftQuoMark}Blockchain Vouchers{rightQuoMark}
          </Text>
          <Text style={{color: 'white', fontSize: 14, marginTop: 14}}> 
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
    backgroundColor: 'black',
  },
  block: {
    flex: 1,
    marginHorizontal: 20, 
    marginVertical: 30, 
    alignItems: 'center',
    backgroundColor: color.GREY_BACKGROUND,
  }
});