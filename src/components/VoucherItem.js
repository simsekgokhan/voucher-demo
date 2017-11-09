import React, { Component } from 'react';
import { 
  StyleSheet, Text, TouchableOpacity, View, Image, Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import Voucher from '../common/voucher.constants';
import color from '../common/colors';

const DARK_BLUE = '#006699';
const DARK_RED = '#4d0000';
const DARK_GREEN = '#003300';

const BLUE = '#33ccff';
const RED = '#cc0000';
const GREEN = '#00e600';

export default class VoucherItem extends Component<{}> {
  
  static REDEEMED = 'Redeemed';
  static SENT = 'Sent';
  static RECEIVED = 'Received';
  static PURCHASED = 'Purchased';
  static REFUNDED = 'Refunded';

  constructor(props) {
    super(props);    
  }

  static propTypes = {
    typeStr: PropTypes.string.isRequired,
  };

  state = {
    expanded: false,
  };

  toggleExpand = () => {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
  }

  render() {

    let voucherColor = DARK_BLUE;
    let textColor = BLUE;
    let amountSign = '+';

    const typeStr = this.props.typeStr;

    switch(typeStr) {
      case VoucherItem.REDEEMED:
        voucherColor = DARK_BLUE;
        textColor = BLUE;
        amountSign = '';
        break;
      case VoucherItem.SENT:
        voucherColor = DARK_RED;
        textColor = RED;
        amountSign = '-';
        break;
       case VoucherItem.PURCHASED:
        voucherColor = DARK_GREEN;
        textColor = GREEN;
        amountSign = '+';
        break;
      case VoucherItem.RECEIVED:
        voucherColor = DARK_GREEN;
        textColor = GREEN;
        amountSign = '+';
        break;
      case VoucherItem.REFUNDED:
        voucherColor = color.DARK_PURPLE;
        textColor = color.PURPLE;
        amountSign = '-';
        break;        
      default:
        voucherColor = DARK_BLUE;
        textColor = BLUE;
        amountSign = '';
        break;
    }

    return(
    <LinearGradient colors={[voucherColor, '#0d0d0d']} style={styles.voucherView}>    
        <TouchableOpacity 
          style={styles.voucher}
          onPress={ this.toggleExpand }
        >
          <View style={styles.voucherRow}>
            <Text style={[styles.voucherText, {color: 'white'}]}> Voucher #1 </Text>
            <Text style={[styles.voucherText, {color: textColor}]}>
              {amountSign}
              <Text style={[styles.voucherText, {color: 'white'}]}> 
                $ {this.props.amount}
              </Text>
            </Text>
          </View>
          <View style={styles.voucherRow}>
            <Text style={styles.voucherText}> Today, 2:40 PM </Text>
            <Text style={[styles.voucherText, {color: textColor}]}> 
              {typeStr} 
            </Text>            
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
                <TouchableOpacity 
                  onPress={() => { this.props.onDetailsPress() }}
                >
                <Text 
                  style={[styles.voucherText, {color: '#33ccff'}]}> 
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




