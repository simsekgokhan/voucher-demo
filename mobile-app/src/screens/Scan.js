
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
let barcodeScanned = false;

class Receive extends Component<{}> {

  constructor(props) {
    super(props);
    barcodeScanned = false;
    // Subscribe to navigator events
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.type === 'ScreenChangedEvent' && event.id ==='willAppear')
      barcodeScanned = false;
  }

  onButtonPress = () => {
    this.props.navigator.push({
      screen: 'ScanQrCode',
      title: 'Pay with Voucher',
      backButtonTitle: 'Back',
      passProps: { 
        payWithVoucher: true,
        id: this.props.id,
        amount: 5
      }
    })
  }

  onBarCodeRead = (qrCodeData) => {
    if(barcodeScanned) 
      return;
    
    barcodeScanned = true;

    let amount;
    if(!Number.isNaN(parseInt(qrCodeData.data))) {
      amount = parseInt(qrCodeData.data);
    } else {
      amount = Math.floor(Math.random()*10 + 1)*50;
    }

    this.props.navigator.push({
      screen: 'ConfirmScreen',
      title: 'Pay with Voucher',
      backButtonTitle: 'Cancel',
      passProps: {
        id: this.props.id,
        confirmType: 'Pay', 
        amount: amount          
      },
    });   
    
    playSound();
  }

  render() {
     return (
      <View style={styles.container}>
        <Camera style={styles.camera}
          ref={(cam) => {this.camera = cam;}}
          aspect={Camera.constants.Aspect.fill}
          onBarCodeRead={ (data) => this.onBarCodeRead(data) }>
          <Image style={{marginTop: 200}}
            source={require('../images/white-rectangle-border.png')}>
          </Image>
          <TouchableOpacity style={styles.footerView}
            onPress={this.onButtonPress}>
            <Text style={styles.scanMyText}>
              Scan my payment QR-code
            </Text>
            <Image style={{marginTop: 8}} source={require('../images/scan-icon.png')}>
            </Image>
          </TouchableOpacity>
        </Camera>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Receive);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BACKGROUND,
    justifyContent: 'center',
  },
  footerView: {
    marginTop: 80,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanMyText: {
    color: 'white',
    fontSize: 14,
    backgroundColor: Color.TRANSPARENT,
  },
  camera: {
    alignItems: 'center'
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
