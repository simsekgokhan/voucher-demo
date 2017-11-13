import React, { Component } from 'react';
import { 
  StyleSheet, Text, TouchableOpacity, View, Image, Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import { StackNavigator } from 'react-navigation';
import Color from '../common/colors';
import VoucherItem from '../components/VoucherItem';
import Voucher from '../common/voucher.constants';

export default class VoucherDetails extends React.Component {

  constructor(props) {
    super(props);    
  }

  // For react-native-navigation  
  static navigatorStyle= {
    tabBarHidden: false,   
  }  

  // todo: duplicate ?
  // For react-navigation 
  static navigationOptions = {
    title: 'Back',
  };

  // todo
  // For react-navigation
  static navigationOptions = ({ navigation })  => ({
    title: 'Voucher', // active only if parent does not pass title
    headerTintColor: Color.BLUE,    
  });

  navigateToConfirm = (confirmType) => { 
    // a) When 'this' created/pushed by react-navigation stack navigation 
    if(this.props.navigation) {    
      const { navigate } = this.props.navigation;    
      navigate('ConfirmScreen', {confirmType: confirmType, amount: 50});
    }
    // b) When 'this' created/pushed by react-native-navigation    
    else if (this.props.navigator) {
      this.props.navigator.push({
        screen: 'ConfirmScreen',
        title: confirmType,
        backButtonTitle: 'Cancel',
        passProps: {
          id: this.props.voucher.id,
          confirmType: confirmType, 
          amount: this.props.voucher.amount,           
        },
      });
    }
  }

  onSendPress = () => {
    this.props.navigator.push({
      screen: 'ShareOnEmail',
      title: 'Share On Email',
      backButtonTitle: 'Back',      
      navigatorButtons: {
        rightButtons: [{
          id: 'send',
          title: 'Send',    
        }]
      },
      passProps: { 
        id: this.props.voucher.id, 
        confirmType: Voucher.SENT, 
        amount: this.props.voucher.amount
      },      
    });
  }
  
  onRefundPress = () => {
    this.navigateToConfirm(Voucher.REFUND);
  }

  render() {  
    const brian = {name: 'Brian Mendoza', email: 'Brian.Mendoza@hotmail.com'};
    const murrey = {name: 'Murrey Derek', email: 'Murrey.Derek@hotmail.com'};
    const hans = {name: 'Hans Dickens', email: 'Hans.Dickens@hotmail.com'};   

    let voucherType = Voucher.PURCHASED; // todo      
    // a) When 'this' created/pushed by react-navigation stack navigation 
    if(this.props.navigation) {
      const { params } = this.props.navigation.state;        
      voucherType = params.voucherType;
    }
    // b) When 'this' created/pushed by react-native-navigation    
    else if (this.props.navigator){
      voucherType = this.props.voucher.status;        
    }
          
    let name = brian.name;
    let email = brian.email;
    let voucherLogo = require('../images/redeemed-logo.png');
    let voucherColor = Color.DARK_BLUE;
    let textColor = Color.BLUE;
    let showButtons = false;

    switch(voucherType) {
      case VoucherItem.REDEEMED:
        voucherColor = Color.DARK_BLUE;
        voucherLogo = require('../images/redeemed-logo.png');
        textColor = Color.BLUE;
        break;
      case VoucherItem.SENT:
        voucherColor = Color.DARK_RED;
        voucherLogo = require('../images/sent-logo.png');
        textColor = Color.RED;
        name = hans.name;
        email = hans.email;
        break;
        case VoucherItem.PURCHASED:
        voucherColor = Color.DARK_GREEN;
        voucherLogo = require('../images/purchased-logo.png');
        textColor = Color.GREEN;
        showButtons = true;
        break;
      case VoucherItem.RECEIVED:
        voucherColor = Color.DARK_GREEN;
        voucherLogo = require('../images/received-logo.png');
        textColor = Color.GREEN;
        showButtons = true;
        name = murrey.name;
        email = murrey.email;
        break;
      case Voucher.REFUNDED:
        voucherColor = Color.DARK_PURPLE;
        voucherLogo = require('../images/refunded-logo.png');
        textColor = Color.PURPLE;
        break;          
      default:
        voucherColor = Color.DARK_BLUE;
        textColor = Color.BLUE;
        break;
    }      

  return (
    <View style={{backgroundColor: 'black', flex: 1}}>
      <LinearGradient colors={[voucherColor, '#0d0d0d']} style={styles.voucherView}>    
        <View style={styles.voucherRow}>
          <Text style={[styles.voucherText, {color: 'white', marginTop:6}]}> 
            Voucher #{this.props.voucher.id}
          </Text>
          <Image source={require('../images/visa-logo-voucher-details.png')} />    
        </View>
        <View style={styles.voucherLogoView}>
          <Image source={voucherLogo} />                    
          <Text 
            style={[styles.voucherText, {color: textColor, marginLeft: 15, fontSize: 20}]}> 
            {voucherType} 
          </Text>            
        </View>  
        <View style={[styles.voucherRow, {marginTop: 30}]}>
          <Text style={[styles.voucherText, {color: 'white'}]}> 
            {name} 
          </Text>
        </View>
        <View style={styles.voucherRow}>
          <Text style={[styles.voucherText, {color: 'white'}]}> 
            {email}
          </Text>
        </View>
        <View style={[styles.voucherRow, {marginTop: 20}]}>
            <Text style={[styles.voucherText, {color: 'white'}]}>
              {`of  `} 
              <Text style={{color: Color.BLUE, fontSize: 28, paddingLeft: 20}}> 
                $ {this.props.voucher.amount} 
              </Text>
            </Text>
        </View>
        {
          showButtons ? 
          <View style={[styles.voucherRow, {marginTop: 30}]}>
              <TouchableOpacity
                  style={styles.buttonSend}
                  onPress={ this.onSendPress } >
              <Image source={require('../images/send-logo.png')} />
              <Text
                  style={[styles.buttonText, { color: Color.RED, paddingHorizontal: 10 }]}>
                  Send
              </Text>
              </TouchableOpacity>
              <TouchableOpacity
                  style={styles.buttonRefund}
                  onPress={ this.onRefundPress } >
              <Image source={require('../images/refund-logo.png')} />
              <Text
                  style={[styles.buttonText, { color: Color.PURPLE, paddingHorizontal: 10 }]}>
                  Refund
              </Text>
              </TouchableOpacity>            
          </View>
          : 
          null
        }
        <View style={styles.footerText}>
          <Text style={[styles.voucherText, {color: 'white'}]}> Today, 2:40 PM </Text>
        </View>
      </LinearGradient>
    </View>     
    );

    }

  }

const styles = StyleSheet.create({
    voucherView: {
      marginHorizontal: 15,
      marginTop: 20,
      marginBottom: 50,
      padding: 24,
      borderRadius: 5,    
      flex: 1,
    },
    voucherLogoView: {
      flexDirection: 'row',    
      marginTop: 30,
      alignItems: 'center',
    },
    voucher: {
      margin: 15,
    },
    voucherRow: {
      flexDirection: 'row',    
      padding: 3,
      justifyContent: 'space-between', 
    },
    voucherText: {
      color: 'rgba(255,255,255,0.7)', 
      backgroundColor: 'transparent',
      fontSize: 18,
      //textAlign: 'center',
    },
    buttonSend: {
      backgroundColor: '#1a1a1a', 
      borderRadius: 20, 
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,      
      padding: 10,      
      width: 120,
    },
    buttonRefund: {
        backgroundColor: '#1a1a1a', 
        borderRadius: 20, 
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,      
        padding: 10,      
        width: 130,
      },
    buttonText: {
      backgroundColor: 'transparent',
      fontSize: 18,
    },
    footerText: {
      position: 'absolute', 
      top: 430, 
      bottom: 0,         
      left: 24, 
      right: 0, 
    },    
  });
  
  
  
  
  