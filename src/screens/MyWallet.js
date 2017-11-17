
import React, { Component } from 'react';
import { 
  StyleSheet, TextInput, Text, TouchableOpacity, View, Image, Dimensions,
  Button
} from 'react-native';
import Color from '../common/colors';

export default class MyWallet extends React.Component {

  render() {
    const hasMoney = true;     
    const balance = hasMoney ? '$ 5,689.08' : '$ 0';

    return (
      <Image style={styles.container}
        resizeMode='cover' 
        source={require('../images/background.png')}>  
        <View style={styles.topView}>
          <Text style={[styles.validThru, {fontSize: 17, color: Color.WHITE}]}> 
              Current Balance 
          </Text>        
          <Text style={{color: Color.WHITE, backgroundColor: 'transparent', fontSize: 26, marginTop: 5}}> 
            {balance} 
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
  card:{
    marginTop: 40,
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
    backgroundColor: 'transparent',
    color: Color.WHITE,
    fontFamily: 'Roboto-Regular',
  },
  cardNoText: {
    fontSize: 26,
    marginTop: 10,
    backgroundColor: 'transparent',            
    color: Color.WHITE,
  },
  validThru: {
    fontSize: 10,
    marginLeft: 6,
    backgroundColor: 'transparent',            
    color: Color.WHITE,
    fontFamily: 'Roboto-Regular'
  },
});
