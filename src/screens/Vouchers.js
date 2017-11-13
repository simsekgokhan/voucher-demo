
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
  
  navigateToDetails = (voucher) => { 
    this.props.navigator.push({
      screen: 'VoucherDetails',
      title: 'Voucher',
      backButtonTitle: 'Back',
      passProps: {voucher}
    })
  }

  createVouherItem = (voucher) => {
    return(
      <VoucherItem 
      onDetailsPress={() => this.navigateToDetails(voucher)} 
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
          voucherItems.unshift(this.createVouherItem(voucher));                
      }
      else {
        voucherItems.unshift(this.createVouherItem(voucher));
      }
    }

    return (
      <Image resizeMode='cover' style={styles.container}  
        source={require('../images/background-more.png')}>
        <View style={styles.topView}>
          <Text style={{color: 'rgba(255,255,255,0.7)'}}> 
            Total Balance 
          </Text>        
          <Text style={{color: 'white', fontSize: 26, marginTop: 5}}> 
            $ {balance} 
          </Text>        
        </View>
          {
            hasVoucher ? 
            <ScrollView vertical style={styles.scrollView}>
              {voucherItems}                             
            </ScrollView>
            :            
            <View style={styles.logoView}>
              <Image
                style={{}}
                source={require('../images/voucher-logo.png')}
              />
              <Text style={{color: 'white', marginTop: 10}}> Buy Your First Voucher </Text>        
            </View>
          }
      </Image>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    vouchers: state.vouchers,
    balance: state.balance,
    allVouchers: state.allVouchers,    
  }
}

export default connect(mapStateToProps)(Vouchers);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  topView: {
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 420, 
    justifyContent: 'center', 
    alignItems: 'center',
    paddingVertical: 10,
  },
  logoView: {
    marginTop: 40,
    justifyContent: 'center', 
    alignItems: 'center',
    margin: 20,
  },
  scrollView: {
    marginTop: 210, 
    marginBottom: 56,
  }
});
