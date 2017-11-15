import React, { Component } from 'react';
import { 
  StyleSheet, Text, TouchableOpacity, View, Image, Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import Voucher from '../common/voucher.constants';
import Color from '../common/colors';

export default class VoucherItem extends Component<{}> {
  
  state = { expanded: false };

  toggleExpand = () => {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
  }

  render() {
    const { id, status, timeStamp, amount, oldStatus } = this.props.voucher;    
    const emailOne = 'Brian.Mendoza@hotmail.com';
    const emailTwo = 'Murrey.Derek@hotmail.com';

    let firstLine;
    if(status === Voucher.PURCHASED || status === Voucher.REFUNDED)
      firstLine = emailOne;
    else if(status === Voucher.SENT)
      firstLine = 'to ' + emailTwo;
    else if(status === Voucher.RECEIVED)
      firstLine = 'from ' + emailTwo;

    let secondLine;
    if(oldStatus === Voucher.PURCHASED)
      secondLine = emailOne;
    else if(oldStatus === Voucher.RECEIVED)
      secondLine = 'from ' + emailTwo;
    else if(oldStatus === Voucher.SENT) // temp added to simulate REDEEMED case
      secondLine = 'to ' + emailTwo;    

    let voucherColor = Color.DARK_BLUE;
    let textColor = Color.BLUE;
    let amountSign = '+';
  
    switch(status) {
      case Voucher.REDEEMED:
        voucherColor = Color.DARK_BLUE;
        textColor = Color.BLUE;
        amountSign = '';
        break;
      case Voucher.SENT:
        voucherColor = Color.DARK_RED;
        textColor = Color.RED;
        amountSign = '-';
        break;
       case Voucher.PURCHASED:
        voucherColor = Color.DARK_GREEN;
        textColor = Color.GREEN;
        amountSign = '+';
        break;
      case Voucher.RECEIVED:
        voucherColor = Color.DARK_GREEN;
        textColor = Color.GREEN;
        amountSign = '+';
        break;
      case Voucher.REFUNDED:
        voucherColor = Color.DARK_PURPLE;
        textColor = Color.PURPLE;
        amountSign = '-';
        break;        
      default:
        voucherColor = Color.DARK_BLUE;
        textColor = Color.BLUE;
        amountSign = '';
        break;
    }

    return(
      <LinearGradient style={styles.voucherView}
        start={[0, 0]} end={[1, 0]}
        colors={[voucherColor, 'white']}>    
        <TouchableOpacity style={styles.voucher}
          onPress={this.toggleExpand}>
          <View style={styles.voucherRow}>
            <Text style={[styles.voucherText, {color: Color.VOUCHER_TEXT_1}]}> 
              Voucher #{id} 
            </Text>
            <Text style={[styles.voucherText, {color: textColor}]}>
              {amountSign}
              <Text style={[styles.voucherText, {color: Color.VOUCHER_TEXT_1}]}> 
                $ {amount}
              </Text>
            </Text>
          </View>
          <View style={styles.voucherRow}>
            <Text style={styles.voucherText}> 
              Today, {timeStamp} PM 
            </Text>
            <Text style={[styles.voucherText, {color: textColor}]}> 
              {status} 
            </Text>            
          </View>  
          {
            this.state.expanded ?
              <View>                    
              {        
                (status === Voucher.REDEEMED) ?
                null :
                <View style={styles.voucherRow}>
                  <Text style={styles.voucherText}> </Text>
                  <Text style={styles.voucherText}> 
                    {firstLine}
                  </Text>
                </View>      
              }
              { 
                (oldStatus === null) ? 
                null :      
                <View>
                  <View style={styles.voucherHorLine} />     
                  <View style={styles.voucherRow}>
                    <Text style={styles.voucherText}> 
                      10-16-2017, 11:00 AM 
                    </Text>
                    <Text style={styles.voucherText}> 
                      {oldStatus} 
                    </Text>
                  </View>  
                  <View style={styles.voucherRow}>
                    <Text style={styles.voucherText}> </Text>
                    <Text style={styles.voucherText}> 
                      {secondLine}
                    </Text>
                  </View>  
                </View>                  
              }    
              {
                (status === Voucher.REDEEMED) ?
                <View>                
                  <View style={styles.voucherHorLine} />     
                  <View style={styles.voucherRow}>
                    <Text style={styles.voucherText}> 
                      9-14-2017, 8:00 AM 
                    </Text>
                    <Text style={styles.voucherText}> 
                      {Voucher.PURCHASED} 
                    </Text>
                  </View>  
                  <View style={styles.voucherRow}>
                    <Text style={styles.voucherText}> </Text>
                    <Text style={styles.voucherText}> 
                      {emailOne}
                    </Text>
                  </View>  
                </View>                
                : null
              }
                <View style={[styles.voucherRow, {marginVertical: 0}]}>
                  <Image source={require('../images/visa-logo.png')}/>                  
                  <TouchableOpacity style={styles.detailsButton}
                    onPress={() => { this.props.onDetailsPress() }}>
                    <Text style={[styles.voucherText, {color: Color.BLUE}]}> 
                      Details > 
                    </Text>           
                  </TouchableOpacity>                    
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
    margin: 3,
    borderRadius: 5,    
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
    alignItems: 'center',    
  },
  voucherText: {
    color: Color.VOUCHER_TEXT_2, 
    backgroundColor: 'transparent',    
    fontSize: 15,
  },
  voucherHorLine: {
    padding: 2,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  detailsButton: {
    justifyContent: 'center',    
    alignItems: 'flex-end',
    width: 80,        
    height: 48,     
  }
});




