import React, { Component } from 'react';
import { 
  StyleSheet, Text, TouchableOpacity, View, Image, Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Color from '../common/colors';
import Voucher from '../common/voucher.constants';

export default class VoucherDetails extends React.Component {
 
  // For react-native-navigation  
  static navigatorStyle= {
    tabBarHidden: false,  // todo: get more common settings here 
    navBarButtonColor: Color.WHITE,    
  }  

  navigateToConfirm = (confirmType) => { 
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

    const voucherType = this.props.voucher.status;        
              
    let name = brian.name;
    let email = brian.email;
    let voucherLogo = require('../images/redeemed.png');
    let voucherColor = Color.REDEEMED;
    let textColor = Color.BLUE;
    let showButtons = false;

    switch(voucherType) {
      case Voucher.REDEEMED:
        voucherColor = Color.REDEEMED;
        voucherLogo = require('../images/redeemed.png');
        textColor = Color.BLUE;
        name = murrey.name;
        email = murrey.email;
        break;
      case Voucher.SENT:
        voucherColor = Color.SENT;
        voucherLogo = require('../images/sent.png');
        textColor = Color.RED;
        name = hans.name;
        email = hans.email;
        break;
        case Voucher.PURCHASED:
        voucherColor = Color.PURCHASED;
        voucherLogo = require('../images/purchased.png');
        textColor = Color.GREEN;
        showButtons = true;
        break;
      case Voucher.RECEIVED:
        voucherColor = Color.RECEIVED;
        voucherLogo = require('../images/received.png');
        textColor = Color.GREEN;
        showButtons = true;
        name = murrey.name;
        email = murrey.email;
        break;
      case Voucher.REFUNDED:
        voucherColor = Color.REFUNDED;
        voucherLogo = require('../images/refunded.png');
        textColor = Color.PURPLE;
        break;          
      default:
        voucherColor = Color.REDEEMED;
        textColor = Color.BLUE;
        break;
    }      

    return (
      <Image style={styles.container}
        resizeMode='cover' 
        source={require('../images/background.png')}>  
        <LinearGradient style={styles.voucherView}
          start={[0, 0]} end={[1, 0]}
          colors={[Color.VOUCHER_SECOND_COLOR, voucherColor]}>
          <View style={styles.voucherRow}>
            <Text style={[styles.voucherText, {marginTop:6}]}> 
              Voucher #{this.props.voucher.id}
            </Text>
            <Image source={require('../images/visa-logo-my-wallet.png')}/>    
          </View>
          <View style={styles.voucherLogoView}>
            <Image source={voucherLogo}/>                    
            <Text 
              style={[styles.voucherText, {color: textColor, marginLeft: 15, fontSize: 20}]}> 
              {voucherType} 
            </Text>            
          </View>  
          <View style={[styles.voucherRow, {marginTop: 30}]}>
            <Text style={styles.voucherText}> 
              {name} 
            </Text>
          </View>
          <View style={styles.voucherRow}>
            <Text style={styles.voucherText}> 
              {email}
            </Text>
          </View>
          <View style={[styles.voucherRow, {marginTop: 20}]}>
            <Text style={styles.voucherText}>
              {`of  `} 
              <Text style={{color: Color.BLUE, fontSize: 32, paddingLeft: 20}}> 
                $ {this.props.voucher.amount}.00 
              </Text>
            </Text>
          </View>
          {
            showButtons ? 
            <View style={[styles.voucherRow, {marginTop: 30}]}>
              <TouchableOpacity style={styles.button}
                onPress={this.onSendPress}>
                <Image source={require('../images/send.png')}/>
                <Text style={[styles.buttonText, {color: Color.RED, paddingHorizontal: 10}]}>
                  Send
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, {width: 130}]}
                onPress={this.onRefundPress}>
                <Image source={require('../images/refund.png')}/>
                <Text style={[styles.buttonText, {color: Color.PURPLE, paddingHorizontal: 10}]}>
                  Refund
                </Text>
              </TouchableOpacity>            
            </View>
            : null
          }
          <View style={styles.footerText}>
            <Text style={styles.voucherText}> 
              Today, 2:40 PM 
            </Text>
          </View>
        </LinearGradient>
      </Image>     
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  voucherView: {
    marginHorizontal: 15,
    marginTop: 30,
    marginBottom: 154,
    padding: 24,
    borderRadius: 5,    
    flex: 1,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: 'grey',
    shadowOffset: { height: 0, width: 0 },
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
    color: Color.TEXT_DEFAULT, 
    backgroundColor: 'transparent',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#eaf2f5', 
    borderRadius: 20, 
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,      
    padding: 10,      
    width: 120,
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

  
  
  
  