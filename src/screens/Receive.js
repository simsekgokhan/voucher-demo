
import React, { Component } from 'react';
import { 
  StyleSheet, TextInput, Text, TouchableOpacity, View, Image
} from 'react-native';
import Camera from 'react-native-camera';
import {connect} from "react-redux";

import color from '../common/colors';
import Voucher from '../common/voucher.constants';
import { addVoucher } from "../actions/vouchersAction";
import { createVoucher } from '../model/voucher.model';

let lastActiveTabIndex = 0;
let barcodeScanned = false;

class Receive extends Component<{}> {

  constructor(props) {
    super(props);
    // if you want to listen on navigator events, set this up
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

    if (event.type === 'NavBarButtonPress' && event.id ==='back')     
        this.props.navigator.switchToTab({ tabIndex: lastActiveTabIndex });  

    if (event.type === 'ScreenChangedEvent' && event.id ==='willAppear')         
        barcodeScanned = false;
  }

  onButtonPress = () => {
    this.props.navigator.push({
      screen: 'ScanQrCode',
      title: 'Receive',
      backButtonTitle: 'Back',
    })
  }

  onBarCodeRead = (data) => {
    if(barcodeScanned)
      return;

    barcodeScanned = true;
    
    const fakeAmount = 200;
    const voucher = createVoucher(Voucher.RECEIVED, fakeAmount);    
    this.props.addVoucher(voucher);  

    this.props.navigator.push({
      screen: 'VoucherDetails',
      title: 'Voucher',
      backButtonTitle: 'Back',
      passProps: { voucher }
    });    
  }

  render() {
     return (      
      <View style={styles.container}>
        <Camera
          ref={(cam) => {this.camera = cam;}}
          style={styles.camera}
          aspect={Camera.constants.Aspect.fill}
          onBarCodeRead={(data) => this.onBarCodeRead(data)} >          
          <Image 
            style={{marginTop: 120}} 
            source={require('../images/white-rectangle-border.png')}>           
          </Image>     
          <TouchableOpacity 
            onPress={this.onButtonPress}
            style={styles.footerView}>       
            <Text style={{color: 'white', fontSize: 12, backgroundColor:'transparent'}}> 
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
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  footerView: {
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'center',    
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






