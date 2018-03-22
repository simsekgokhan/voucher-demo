import React, { Component } from 'react';
import { 
  StyleSheet, Text, TouchableOpacity, View, Image, Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import Voucher from '../common/voucher.constants';
import Color from '../common/colors';
import Vouchers from '../model/voucher.model';
import { getTime } from "../common/time";

class VoucherItem extends Component<{}> {

  state = { expanded: false };

  toggleExpand = () => {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
  }

  render() {
    const { id, status, timeStamp, amount, history, email } = this.props.voucher;

    const voucherColor = Vouchers[status].voucherColor;
    const textColor = Vouchers[status].textColor;
    const amountSign = Vouchers[status].amountSign;

    const voucherBottomMargin = this.state.expanded ? 2 : 15;
    return(
      <LinearGradient style={styles.voucherView}
        start={[0, 0]} end={[1, 0]}
        colors={[voucherColor, 'white']}>
        <TouchableOpacity style={[styles.voucher, {marginBottom: voucherBottomMargin}]}
          onPress={this.toggleExpand}>
          <View style={styles.voucherRow}>
            <Text style={[styles.voucherText, {color: Color.VOUCHER_TEXT_1}]}>
              Voucher #{id}
            </Text>
            <Text style={[styles.voucherText, {color: textColor}]}>
              {amountSign + ' '}
              <Text style={[styles.voucherText, {color: Color.VOUCHER_TEXT_1}]}>
                ${amount}.00
              </Text>
            </Text>
          </View>
          <View style={styles.voucherRow}>
            <Text style={styles.voucherText}>
              {('Last Action: ' + getTime(timeStamp, this.props.timeFormat))}
            </Text>
            <Text style={[styles.voucherText, {color: textColor}]}>
              {          
                Vouchers[status].toString
              }
            </Text>
          </View>
          {
            this.state.expanded ?
              <View>        
                {
                  history.slice(0).reverse().map((historyItem) => (
                    <View>
                      <View style={styles.voucherHorLine} />
                      <View style={styles.voucherRow}>
                        <Text style={styles.voucherText}>
                          {getTime(historyItem.timeStamp, this.props.timeFormat)}
                        </Text>
                        <Text style={styles.voucherText}>
                          {Vouchers[historyItem.status].toString}
                        </Text>
                      </View>
                      <View style={styles.voucherRow}>                    
                        <Text style={styles.voucherText}>
                          {
                            (historyItem.status === Voucher.PURCHASED || 
                              historyItem.status === Voucher.RECEIVED) ? 
                              ('+$' + historyItem.amount) 
                              : null
                          }
                          {
                            historyItem.status === Voucher.PAID ? 
                              ('-$' + historyItem.amount) 
                              : null
                          }
                        </Text>
                        <Text style={styles.voucherText}>
                          {
                            historyItem.status === Voucher.RECEIVED ? 'from ' :
                              historyItem.status === Voucher.SENT ? 'to ' : ''
                          }{
                            historyItem.email
                          }
                        </Text>
                      </View>
                    </View>
                  ))
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
export default connect((state) => {
  return {
    timeFormat: state.app.timeFormat,
  }
})(VoucherItem);
const styles = StyleSheet.create({
  voucherView: {
    margin: 3,
    borderRadius: 5,    
    justifyContent: 'center', 
    width: Dimensions.get('window').width - 20,    
  },
  voucher: {
    margin: 15,
    marginBottom: 15,
  },
  voucherRow: {
    flexDirection: 'row',    
    padding: 3,
    justifyContent: 'space-between',     
    alignItems: 'center',    
  },
  voucherText: {
    color: Color.VOUCHER_TEXT_2, 
    backgroundColor: Color.TRANSPARENT,    
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




