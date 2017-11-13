
import React, { Component } from 'react';
import { 
  StyleSheet, TextInput, Text, TouchableOpacity, View, Image
} from 'react-native';
import Camera from 'react-native-camera';
import {connect} from "react-redux";

import Color from '../common/colors';
import Voucher from '../common/voucher.constants';
import { setHasVoucher, addVoucher } from "../actions/vouchersAction";
import { createVoucher } from '../model/voucher.model';

let lastActiveTabIndex = 0;

class ScanQrCode extends Component<{}> {

  onButtonPress = () => {
    const fakeAmount = 500;
    const voucher = createVoucher(Voucher.RECEIVED, fakeAmount);    
    this.props.addVoucher(voucher);  
    
    this.props.navigator.push({
      screen: 'VoucherDetails',
      title: 'Voucher',
      backButtonTitle: 'Back',
      passProps: {voucher}
    })
  }

  render() {
     return (
      <Image resizeMode='cover' style={styles.container}
        source={require('../images/background-receive.png')}>   
        <Image 
          style={{marginTop: 140}} 
          source={require('../images/white-rectangle-border.png')}>           
        </Image>     
        <TouchableOpacity 
          onPress={this.onButtonPress}
          style={styles.footerView}>       
          <Text style={{color: 'white', backgroundColor:'transparent', fontSize: 12}}> 
            Scan my payment QR-code
          </Text>             
          <Image style={{marginTop: 8}} source={require('../images/scan-icon.png')}>           
          </Image>          
        </TouchableOpacity>    
      </Image>
     )
  }
}

const mapStateToProps = (state) => {
  return {
    hasVoucher: state.hasVoucher,    
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setHasVoucher: (state) => {
      dispatch(setHasVoucher(state));      
    },
    addVoucher: (state) => {
      dispatch(addVoucher(state));      
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScanQrCode);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerView: {
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'center',    
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});






