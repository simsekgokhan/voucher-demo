
import React, { Component } from 'react';
import { 
  StyleSheet, TextInput, Text, TouchableOpacity, View, Image, Dimensions,
  ScrollView, Button
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import VoucherItem from '../components/VoucherItem';
import { StackNavigator } from 'react-navigation';
import Color from '../common/colors';
import VoucherDetails from '../screens/VoucherDetails';

export default class SendVoucher extends React.Component {
  
  static navigatorStyle = {
    navBarHidden: true
  };

  navigateToDetails = (voucherType) => { 
      this.props.navigator.push({
        screen: 'VoucherDetails',
        title: 'Voucher',
        backButtonTitle: 'Back',
        buttonColor: 'red',
        passProps: {voucherType: voucherType},
      });
  }

  render() {

    const sendVoucherScreen =  this.props.sendVoucher;

    const hasVoucher = true;     
    const balance = hasVoucher ? '$ 500,689.08' : '$ 0';

    return (
      <Image resizeMode='cover' style={styles.container}
        source={require('../images/background-more.png')}>                       
        <View style={styles.topView}>
          <Text style={{color: 'rgba(255,255,255,0.7)'}}> 
              Total Balance 
          </Text>        
          <Text style={{color: 'white', fontSize: 20, marginTop: 5}}> {balance} </Text>        
        </View>
          {
            hasVoucher ? 
            <ScrollView vertical style={styles.scrollView}>
              { 
                sendVoucherScreen ? null :            
                <VoucherItem 
                  onDetailsPress={() => this.navigateToDetails(VoucherItem.SENT)} 
                  typeStr={VoucherItem.SENT}/>
              }
              <VoucherItem 
                onDetailsPress={() => this.navigateToDetails(VoucherItem.PURCHASED)} 
                typeStr={VoucherItem.PURCHASED}/>
              { 
                sendVoucherScreen ? null :   
              <VoucherItem 
                onDetailsPress={() => this.navigateToDetails(VoucherItem.REDEEMED)} 
                typeStr={VoucherItem.REDEEMED}/>                        
              }
              <VoucherItem 
                onDetailsPress={() => this.navigateToDetails(VoucherItem.RECEIVED)} 
                typeStr={VoucherItem.RECEIVED}/>          
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
    bottom: 350, 
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
  }
});