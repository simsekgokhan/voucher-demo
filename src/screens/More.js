import React, { Component } from 'react';
import { 
  StyleSheet, TextInput, Text, TouchableOpacity, View, Image , Dimensions,
  Share
} from 'react-native';

import Color from '../common/colors';
import { startSingleScreenApp } from '../../App';

const rightButtons = {  
  rightButtons: [{
    id: 'skip',
    buttonColor: 'blue',
    icon: require('../images/skip-button.png'),      
  }]
}

export default class More extends Component<{}> {

  navigateTo(screen, title, backButtonTitle, rightButtonEnabled, 
             passProps=null, navBarHidden=false){
    this.props.navigator.push({
      screen: screen,
      title: title,
      navigatorStyle: {
        navBarHidden: navBarHidden, 
      },
      backButtonTitle: backButtonTitle,
      navigatorButtons: rightButtonEnabled ? rightButtons : null,
      passProps: passProps,
    });
  }

  share() {
    Share.share({
      message: 'Share Blockchain Voucher',
      url: 'https://google.com',
      title: 'Share'
    }, {
      // Android only:
      dialogTitle: 'Share Blockchain Voucher',
    })
  }

  onButtonPress = (button) => {
    switch(button) {
      case 1:
        this.navigateTo('MyWallet', 'My Wallet', 'Back', false);
        break;
      case 2:
        this.navigateTo('CardRegister', 'Card Registration', 'Cancel', true);
        break;
      case 3:
        this.navigateTo('Vouchers', '', '', false, {sendVoucherScreen: true}, true);
        break;           
      case 4:
        this.navigateTo('Settings', 'Settings', 'Back', false);
        break;               
      case 5:
        this.share();
        break;    
      case 6:
        startSingleScreenApp();      
        break;                       
      default:
        break;
    }    
  }

  render() {
    return (
      <Image resizeMode='cover' style={styles.container}
        source={require('../images/background-more.png')}>                   
        <Image 
          style={{marginTop: 44}} 
          source={require('../images/blockchain-logo.png')}>           
        </Image>     
        <Image 
          style={styles.row0} 
          source={require('../images/more-row-0.png')}>          
          <View style={styles.row0View}>
            <Image 
            style={{marginTop: 6}} 
            source={require('../images/balance-icon.png')}/>
            <View style={styles.textView}>
              <Text style={styles.text}>
                Current Balance
              </Text>
              <Text style={styles.textBalance}>
                $ 500,689.00
              </Text>
            </View>
          </View>
        </Image>
        <TouchableOpacity style={styles.rowButton}
          onPress={ () => this.onButtonPress(1) } >
          <Image source={require('../images/wallet-icon.png')} />
          <Text style={styles.textButton}>
              My Wallet
          </Text>
        </TouchableOpacity>   
        <TouchableOpacity style={styles.rowButton}
          onPress={ () => this.onButtonPress(2) } >
          <Image source={require('../images/pay-card-regis-icon.png')} />
          <Text style={styles.textButton}>
              Payment Card Registration
          </Text>
        </TouchableOpacity>          
        <TouchableOpacity style={styles.rowButton}
          onPress={ () => this.onButtonPress(3) } >
          <Image source={require('../images/send-voucher-icon.png')} />
          <Text style={styles.textButton}>
              Send Voucher
          </Text>
        </TouchableOpacity>       
        <TouchableOpacity style={styles.rowButton}
          onPress={ () => this.onButtonPress(4) } >
          <Image source={require('../images/settings-icon.png')} />
          <Text style={styles.textButton}>
              Settings
          </Text>
        </TouchableOpacity>       
        <TouchableOpacity style={styles.rowButton}
          onPress={ () => this.onButtonPress(5) } >
          <Image source={require('../images/invite-icon.png')} />
          <Text style={styles.textButton}>
              Invite Contacts
          </Text>
        </TouchableOpacity>       
        <TouchableOpacity style={styles.rowButton}
          onPress={ () => this.onButtonPress(6) } >
          <Image source={require('../images/logout-icon-3.png')} />
          <Text style={[styles.textButton, {color: Color.BLUE}]}>
              Logout
          </Text>
        </TouchableOpacity>                                        
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      alignItems: 'center',
      backgroundColor: 'black',  
    },
  logo: {
    alignItems: 'center',
    justifyContent:'center',
  },
  row0: {
    marginTop: 40,
    justifyContent:'center',
  },
  row0View: {
    flexDirection: 'row',
    marginLeft: 22,
  },
  textView: {
    marginLeft: 18,
  },
  text: {
    fontSize: 18,
    backgroundColor: 'transparent',
    color: 'white'
  },
  textBalance: {
    color: Color.BLUE,
    fontSize: 26,
    backgroundColor: 'transparent',
  },
  rowButton: {
    backgroundColor: '#171721',
    alignItems: 'center',
    flexDirection: 'row',
    height: 56,
    paddingLeft: 16,
    width: Dimensions.get('window').width - 6,  
    marginBottom: 2,      
  },
  textButton: {
    marginLeft: 22,
    fontSize: 18,
    backgroundColor: 'transparent',
    color: 'white'
  }
});






