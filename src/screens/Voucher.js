import React, { Component } from 'react';
import { 
  StyleSheet, TextInput, Text, TouchableOpacity, View, Image, Dimensions,
  ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import VoucherItem from '../components/VoucherItem';

export default class Voucher extends Component<{}> {

  render() {

    const hasVoucher = true;     
    
    return (
      <View style={styles.container}>
        <View style={styles.topView}>
          <Text style={{color: 'rgba(255,255,255,0.7)'}}> Total Balance </Text>        
          <Text style={{color: 'white', fontSize: 20, marginTop: 5}}> $ 500,689.08 </Text>        
        </View>
        <ScrollView vertical style={styles.centerView}>
          {
            hasVoucher ? 
            <View>
              <VoucherItem typeStr={VoucherItem.REDEEM}/>
              <VoucherItem typeStr={VoucherItem.SENT}/>
              <VoucherItem typeStr={VoucherItem.RECEIVED}/>
              <VoucherItem typeStr={VoucherItem.PURCHASED}/>
              <VoucherItem typeStr={VoucherItem.REDEEM}/>
              <VoucherItem typeStr={VoucherItem.SENT}/>
              <VoucherItem typeStr={VoucherItem.RECEIVED}/>
              <VoucherItem typeStr={VoucherItem.PURCHASED}/>
              <VoucherItem typeStr={VoucherItem.REDEEM}/>
              <VoucherItem typeStr={VoucherItem.SENT}/>
              <VoucherItem typeStr={VoucherItem.RECEIVED}/>
              <VoucherItem typeStr={VoucherItem.PURCHASED}/>              
            </View>
            :            
            <View>
              <Image
                style={{}}
                source={require('../images/voucher-logo.png')}
              />
              <Text style={{color: 'white', marginTop: 10}}> Buy Your First Voucher </Text>        
            </View>
          }
        </ScrollView>
      </View>
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
    bottom: 450, 
    justifyContent: 'center', 
    alignItems: 'center',
    paddingVertical: 10,
  },
  centerView: {
    marginTop: 130,
    padding: 10,
    // justifyContent: 'center', 
    // alignItems: 'center',
  },
});






