
import React, { Component } from 'react';
import { 
  StyleSheet, TextInput, Text, TouchableOpacity, View, Image
} from 'react-native';
import Camera from 'react-native-camera';
import color from '../common/colors';
import Voucher from '../common/voucher.constants';

let lastActiveTabIndex = 0;

export default class Receive extends Component<{}> {

  onButtonPress = () => {
    this.props.navigator.push({
      screen: 'VoucherDetails',
      title: 'Voucher',
      backButtonTitle: 'Back',
      passProps: {voucherType: Voucher.RECEIVED}
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






