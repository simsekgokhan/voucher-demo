import React, { Component } from 'react';
import { 
  StyleSheet, Text, TouchableOpacity, View, Image, Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class VoucherItem extends Component<{}> {
  
  state = {
    expanded: false,
  };

  toggleExpand = () => {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
  }

  render() {
    return(
    <LinearGradient colors={['#006699', 'black']} style={styles.voucherView}>    
        <TouchableOpacity 
          style={styles.voucher}
          onPress={ this.toggleExpand }
        >
          <View style={styles.voucherRow}>
            <Text style={[styles.voucherText, {color: 'white'}]}> Voucher #1 </Text>
            <Text style={[styles.voucherText, {color: 'white'}]}> $30 </Text>
          </View>
          <View style={styles.voucherRow}>
            <Text style={styles.voucherText}> Today, 2:40 PM </Text>
            <Text style={[styles.voucherText, {color: '#33ccff'}]}> Redeemed </Text>            
          </View>  
          {
            this.state.expanded ?
              <View>
              <View style={styles.voucherHorLine} />     
              <View style={styles.voucherRow}>
                <Text style={styles.voucherText}> 10-17-2017, 12:00 AM </Text>
                <Text style={styles.voucherText}> Sent </Text>
              </View>  
              <View style={styles.voucherRow}>
                <Text style={styles.voucherText}> </Text>
                <Text style={styles.voucherText}> to Murrey.Derek@hotmail.com </Text>
              </View>            
              <View style={styles.voucherHorLine} />     
              <View style={styles.voucherRow}>
                <Text style={styles.voucherText}> 10-16-2017, 11:00 AM </Text>
                <Text style={styles.voucherText}> Purchased </Text>
              </View>  
              <View style={styles.voucherRow}>
                <Text style={styles.voucherText}> </Text>
                <Text style={styles.voucherText}> to Murrey.Derek@hotmail.com </Text>
              </View>      
              <View style={styles.voucherRow}>
                <Image
                  source={require('../images/visa-logo.png')}
                />
                <Text style={{color: '#33ccff'}}> Details > </Text>                               
              </View>    
              </View>
            :
              null
          }
        </TouchableOpacity>         
      </LinearGradient>
        );           
  }
}

const styles = StyleSheet.create({
  voucherView: {
    justifyContent: 'center', 
    width: Dimensions.get('window').width - 20,    
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
    backgroundColor: 'transparent'
  },
  voucherHorLine: {
    padding: 2,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
});






