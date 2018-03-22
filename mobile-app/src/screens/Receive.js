
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
    this.state = { openCamera: false };
    // Subscribe to navigator events
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  static navigatorButtons = {
    leftButtons: [{
      id: 'back',
      icon: require('../images/back-button.png'),
    }]
  }

  onNavigatorEvent(event) {
    if(event.unselectedTabIndex >= 0)
      lastActiveTabIndex = event.unselectedTabIndex;
    else if (event.type === 'NavBarButtonPress' && event.id ==='back')
      this.props.navigator.switchToTab({ tabIndex: lastActiveTabIndex });
    else if (event.type === 'ScreenChangedEvent' && event.id ==='willAppear')
      barcodeScanned = false;
    else if (event.type === 'ScreenChangedEvent' && event.id ==='didAppear')
      this.setState({ openCamera: true });
    else if (event.type === 'ScreenChangedEvent' && event.id ==='didDisappear')
      this.setState({ openCamera: false });
    else if (event.id === 'bottomTabSelected')
      this.props.navigator.handleDeepLink({
        link: 'AllTabs.popToRoot',
        payload: { sender: 'Receive' }
      });
    else if (event.type === 'DeepLink' && event.link === 'AllTabs.popToRoot' &&
             event.payload.sender !== 'Receive')
      this.props.navigator.popToRoot({ animationType: 'fade' });
  }

  onButtonPress = () => {
    this.props.navigator.push({
      screen: 'ScanQrCode',
      title: 'Receive',
      backButtonTitle: 'Back',
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
    const voucher = createVoucher(Voucher.RECEIVED, amount);
    voucher.qrScanned = true;
    this.props.addVoucher(voucher);

    const transactionType = Voucher.RECEIVED;
    
    this.props.navigator.push({
      screen: 'VoucherDetails',
      title: 'Voucher',
      backButtonTitle: 'Back',
      passProps: { voucher, transactionType }
    });
    playSound();
  }

  render() {
    if(!this.state.openCamera)
      return null;
    
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
