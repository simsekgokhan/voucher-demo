
import React, { Component } from 'react';
import { 
  StyleSheet, TextInput, Text, TouchableOpacity, View, Image, Dimensions,
  ScrollView, Button
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from "react-redux";

import VoucherItem from '../components/VoucherItem';
import Color from '../common/colors';
import VoucherDetails from '../screens/VoucherDetails';
import Voucher from '../common/voucher.constants';

class Vouchers extends React.Component {

  constructor(props) {
    super(props);
    // Subscribe to navigator events
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) { 
    if (event.id === 'bottomTabSelected') {
      this.props.navigator.handleDeepLink({
        link: 'AllTabs.popToRoot', 
        payload: { sender: 'Vouchers' }
      });          
    }
    else if (event.type === 'DeepLink' && event.link === 'AllTabs.popToRoot' &&
             event.payload.sender !== 'Vouchers') {
      this.props.navigator.resetTo({ 
        screen: 'Vouchers', 
        navigatorStyle: { navBarHidden: true } 
      });     
    }    
  }

  navigateToDetails = (voucher) => { 
    this.props.navigator.push({
      screen: 'VoucherDetails',
      title: 'Voucher',
      backButtonTitle: 'Back',
      passProps: {voucher}
    })
  }

  VoucherItem = (voucher) => {
    return(
      <VoucherItem 
        onDetailsPress={ () => this.navigateToDetails(voucher) } 
        voucher={voucher}/>
    );
  }

  render() {
    const hasVoucher = (this.props.vouchers.allVouchers.length > 0);     
    const balance = this.props.vouchers.balance;
    
    let voucherItems = [];
    const allVouchers = this.props.vouchers.allVouchers;    
    for(const voucher of allVouchers){
      // If this is SendVoucher screen, show only purchased and received vouchers,
      // otherwise show all vouchers
      if(this.props.sendVoucherScreen) {
        if(voucher.status === Voucher.PURCHASED || voucher.status === Voucher.RECEIVED)
          voucherItems.unshift(this.VoucherItem(voucher));                
      }
      else {
        voucherItems.unshift(this.VoucherItem(voucher));
      }
    }

    return (
      <Image resizeMode='cover' style={styles.container}  
        source={require('../images/background.png')}>
        <Image style={styles.appLogo}  
          source={require('../images/app-logo-small.png')}/>
        <View style={styles.topView}>
          <Text style={styles.totalBalance}> 
            Total Balance 
          </Text>        
          <Text style={styles.balance}> 
            $ {balance}.00
          </Text>        
        </View>
        {
          hasVoucher ? 
          <ScrollView vertical style={styles.scrollView}>
            {voucherItems}                             
          </ScrollView>
          :            
          <View style={styles.logoView}>
            <Image source={require('../images/voucher-logo.png')}/>
            <Text style={styles.buyYourText}> 
              Buy Your First Voucher 
            </Text>
          </View>
        }
      </Image>
    );
  }
}

const mapStateToProps = (state) => {
  return { vouchers: state.vouchers }
}

export default connect(mapStateToProps)(Vouchers);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexGrow: 1,
    backgroundColor: Color.BACKGROUND,
  },
  appLogo: {
    position: 'absolute', 
    top: 40, 
    left: 16, 
    right: 0, 
    bottom: 0, 
  },
  topView: {
    marginTop: 100,
    justifyContent: 'center', 
    alignItems: 'center',
    paddingVertical: 10,
  },
  totalBalance: {
    color: Color.WHITE, 
    fontSize: 17, 
    backgroundColor: 'transparent',
  },
  balance: {
    color: Color.WHITE, 
    fontSize: 26, 
    backgroundColor: 'transparent', 
    marginTop: 5,
  },
  logoView: {
    marginTop: 32,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  buyYourText: {
    color: Color.WHITE, 
    fontSize: 20, 
    backgroundColor: 'transparent', 
    marginTop: 18,
  },
  scrollView: {
    marginTop: 36, 
    marginBottom: 56,
  }
});
