
import React, { Component } from 'react';
import { 
  StyleSheet, TextInput, Text, TouchableOpacity, View, Image
} from 'react-native';
import Camera from 'react-native-camera';
import color from '../common/colors';
import Voucher from '../common/voucher.constants';

let lastActiveTabIndex = 0;

export default class Receive extends Component<{}> {

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
  }

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
      <View style={styles.container}>
        <Image 
          style={{marginTop: 120}} 
          source={require('../images/white-rectangle-border.png')}>           
        </Image>     
        <TouchableOpacity 
          onPress={this.onButtonPress}
          style={styles.footerView}>       
          <Text style={{color: 'white', fontSize: 12}}> 
            Scan my payment QR-code
          </Text>             
          <Image style={{marginTop: 8}} source={require('../images/scan-icon.png')}>           
          </Image>          
        </TouchableOpacity>    
      </View>
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






