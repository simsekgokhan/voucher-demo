
import React, { Component } from 'react';
import { 
  StyleSheet, TextInput, Text, TouchableOpacity, View, Image
} from 'react-native';
import Camera from 'react-native-camera';
import {connect} from "react-redux";

import Color from '../common/colors';
import { playSound } from '../common/sounds';
import Voucher from '../common/voucher.constants';
import { addVoucher } from "../actions/vouchersAction";
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
    });
    playSound();
  }

  render() {
     return (
      <Image style={styles.container}
        resizeMode='cover' 
        source={require('../images/background-receive.png')}>   
        <Image style={{marginTop: 140}} 
          source={require('../images/white-rectangle-border.png')}/>             
        <TouchableOpacity style={styles.footerView}
          onPress={this.onButtonPress}>       
          <Text style={styles.scanMyText}> 
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
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    addVoucher: (state) => {
      dispatch(addVoucher(state));      
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScanQrCode);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BLACK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerView: {
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'center',    
  },
  scanMyText: {
    color: Color.WHITE, 
    fontSize: 14, 
    backgroundColor: Color.TRANSPARENT,
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






