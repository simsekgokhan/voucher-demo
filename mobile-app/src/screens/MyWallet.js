
import React from 'react';
import { 
  StyleSheet, Text,  View, Image,   
} from 'react-native';
import Color from '../common/colors';
import {connect} from "react-redux";

class MyWallet extends React.Component {

  render() {
    const balance = this.props.balance;

    return (
      <Image style={styles.container}
        resizeMode='cover' 
        source={require('../images/background.png')}>  
        <View style={styles.topView}>
          <Text style={styles.currentBalance}> 
              Wallet Balance
          </Text>        
          <Text style={styles.balance}> 
            ${balance}.00
          </Text>        
        </View>
        <Image style={styles.card} 
          source={require('../images/card.png')}>          
          <View style={styles.row0}>
            <Text style={styles.text}>
              Virtual Card 
            </Text>
            <Image style={{marginTop: 6}} 
              source={require('../images/app-logo-small.png')}/>
          </View>          
          <View style={styles.row0}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.cardNoText}>
                4056 
              </Text>
              <Text style={[styles.cardNoText, {marginLeft: 14}]}>
                1234
              </Text>              
              <Text style={[styles.cardNoText, {marginLeft: 14}]}>
                5678
              </Text>     
              <Text style={[styles.cardNoText, {marginLeft: 14}]}>
                9000
              </Text>                                 
            </View>
          </View>
          <View style={[styles.row0, {justifyContent: 'center'}]}>
            <View style={{marginLeft: 44}}>
              <Text style={styles.validThru}>
                VALID 
              </Text>
              <Text style={styles.validThru}>
                THRU
              </Text>
            </View>
            <Text style={[styles.validThru, {fontSize: 17}]}>
              01/20
            </Text>
          </View>
          <View style={[styles.row0, {marginTop: 6}]}>
            <Text style={[styles.text, {fontSize: 17, marginTop: 8}]}>
              BRIAN MENDOZA
            </Text>
            <Image style={{marginTop: 6}} 
              source={require('../images/visa-logo-my-wallet.png')}/>
          </View>
        </Image>
      </Image>
    );
  }
}

export default connect((state) => {
  return {
    balance: state.vouchers.walletBalance,
  }
})(MyWallet);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  topView: {
    marginTop: 40,
    justifyContent: 'center', 
    alignItems: 'center',
    paddingVertical: 10,
  },
  currentBalance: {
    fontSize: 17,
    marginLeft: 6,
    backgroundColor: Color.TRANSPARENT,            
    color: Color.WHITE,
    fontFamily: 'Roboto-Regular'
  },
  balance: {
    color: Color.WHITE, 
    backgroundColor: Color.TRANSPARENT, 
    fontSize: 26, 
    marginTop: 5
  },
  card: {    
    marginTop: 32,
  },
  row0: {
    flexDirection: 'row',
    marginTop: 16,
    marginHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row0View: {
    flexDirection: 'row',
    marginLeft: 22,
  },
  textView: {
    marginLeft: 18,
  },
  text: {
    backgroundColor: Color.TRANSPARENT,
    color: Color.BLUE_DARK,
    fontFamily: 'Roboto-Regular',
  },
  cardNoText: {
    fontSize: 26,
    marginTop: 10,
    backgroundColor: Color.TRANSPARENT,            
    color: Color.BLUE_DARK,
  },
  validThru: {
    fontSize: 10,
    marginLeft: 6,
    backgroundColor: Color.TRANSPARENT,            
    color: Color.BLUE_DARK,
    fontFamily: 'Roboto-Regular'
  },
});
