import React, { Component } from 'react';
import { 
  StyleSheet, Text, TouchableOpacity, View, Image, Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import { StackNavigator } from 'react-navigation';
import color from '../common/colors';
import VoucherItem from '../components/VoucherItem';
import Voucher from '../common/voucher.constants';

export default class VoucherDetails extends React.Component {

  constructor(props) {
    super(props);    
  }

  static navigationOptions = ({ navigation })  => ({
    title: 'Voucher', // active only if parent does not pass title
    headerTintColor: color.BLUE,    
  });

  navigateToConfirm = (confirmType) => { 
    const { navigate } = this.props.navigation;    
    navigate('ConfirmScreen', {confirmType: confirmType, amount: 50});
  }

  onSendPress = () => {
    this.navigateToConfirm(Voucher.SEND);
  }
  
  onRefundPress = () => {
    this.navigateToConfirm(Voucher.REFUND);
  }

  render() {  
      let voucherLogo = require('../images/redeemed-logo.png');
      let voucherColor = color.DARK_BLUE;
      let textColor = color.BLUE;
      let showButtons = false;
  
      // Get params passed by Vouchers.navigateToDetails()
      const { params } = this.props.navigation.state;        
      const voucherType = params.voucherType;
  
      switch(voucherType) {
        case VoucherItem.REDEEMED:
          voucherColor = color.DARK_BLUE;
          voucherLogo = require('../images/redeemed-logo.png');
          textColor = color.BLUE;
          break;
        case VoucherItem.SENT:
          voucherColor = color.DARK_RED;
          voucherLogo = require('../images/sent-logo.png');
          textColor = color.RED;
          break;
         case VoucherItem.PURCHASED:
          voucherColor = color.DARK_GREEN;
          voucherLogo = require('../images/purchased-logo.png');
          textColor = color.GREEN;
          showButtons = true;
          break;
        case VoucherItem.RECEIVED:
          voucherColor = color.DARK_GREEN;
          voucherLogo = require('../images/received-logo.png');
          textColor = color.GREEN;
          showButtons = true;
          break;
        case Voucher.REFUNDED:
          voucherColor = color.DARK_PURPLE;
          voucherLogo = require('../images/refunded-logo.png');
          textColor = color.PURPLE;
          break;          
        default:
          voucherColor = color.DARK_BLUE;
          textColor = color.BLUE;
          break;
      }      

    return (
      <View style={{backgroundColor: 'black', flex: 1}}>
        <LinearGradient colors={[voucherColor, '#0d0d0d']} style={styles.voucherView}>    
          <View style={styles.voucherRow}>
            <Text style={[styles.voucherText, {color: 'white', marginTop:6}]}> 
              Voucher #1 
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
              Brian Mendoza 
            </Text>
          </View>
          <View style={styles.voucherRow}>
            <Text style={[styles.voucherText, {color: 'white'}]}> 
              brian.mendoza@hotmal.com 
            </Text>
          </View>
          <View style={[styles.voucherRow, {marginTop: 20}]}>
              <Text style={[styles.voucherText, {color: 'white'}]}> of 
                <Text style={{color: textColor, fontSize: 28}}> $ 20.00 </Text>
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
                    style={[styles.buttonText, { color: color.RED, paddingHorizontal: 10 }]}>
                    Send
                </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonRefund}
                    onPress={ this.onRefundPress } >
                <Image source={require('../images/refund-logo.png')} />
                <Text
                    style={[styles.buttonText, { color: color.PURPLE, paddingHorizontal: 10 }]}>
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
  
  
  
  
  