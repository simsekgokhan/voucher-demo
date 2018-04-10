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
    const { id, status, timeStamp, balance, history, email } = this.props.voucher;

    const voucherColor = Vouchers[status].voucherColor;
    const textColor = Vouchers[status].textColor;
    const voucherBalanceText = (status === Voucher.REDEEMED
                                || status === Voucher.SENT
                                || status === Voucher.REFUNDED) ? null : ('$' + balance + '.00');
    const lastHistoryItem = history[history.length-1];
    const stateStr = (status === Voucher.ACTIVE) ? 'Active' : Vouchers[status].toString;
    
    const voucherBottomMargin = this.state.expanded ? 2 : 15;
    return(
      <LinearGradient style={styles.voucherView}
        start={[0, 0]} end={[1, 0]}
        colors={[voucherColor, 'white']}>
        <TouchableOpacity style={[styles.voucher, {marginBottom: voucherBottomMargin}]}
          onPress={this.toggleExpand}>
          <View style={styles.voucherRow}>
            <Text style={[styles.voucherText, {color: Vouchers[status].textColor}]}>
              {stateStr}
            </Text>          
            <Text style={[styles.voucherText, {color: Color.VOUCHER_TEXT_1}]}>
              {voucherBalanceText}
            </Text>
          </View>
          <View style={styles.voucherRow}>
            <Text style={[styles.voucherText, {color: Color.VOUCHER_TEXT_1}]}>
              Voucher #{id} 
            </Text>
          </View>
          <View>
          <View style={styles.voucherHorLine} />
          <View style={styles.voucherRow}>
            <Text style={styles.voucherText}>
              {getTime(lastHistoryItem.timeStamp, this.props.timeFormat)}
              </Text>
              <Text style={styles.voucherText}>
                {Vouchers[lastHistoryItem.status].toString}
              </Text>
            </View>
            <View style={styles.voucherRow}>
              <Text style={styles.voucherText}>
                {
                  (lastHistoryItem.status === Voucher.PURCHASED ||
                    lastHistoryItem.status === Voucher.RECEIVED) ?
                    ('+$' + lastHistoryItem.amount)
                    : null
                }
                {
                  lastHistoryItem.status === Voucher.PAID ?
                    ('-$' + lastHistoryItem.amount)
                    : null
                }
              </Text>
              <Text style={styles.voucherText}>
                {
                  lastHistoryItem.status === Voucher.RECEIVED ? 'from ' :
                    lastHistoryItem.status === Voucher.SENT ? 'to ' : ''
                }{
                  lastHistoryItem.email
                }
              </Text>
            </View>
          </View>          
          {
            this.state.expanded ?
              <View>                 
                {
                  history.slice(0, history.length-1).reverse().map((historyItem) => (
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
                {
                  (status === Voucher.ACTIVE) ? 
                    <View style={[styles.voucherRow, {marginTop: 22, marginBottom: 4, marginHorizontal: 38}]}>
                      <TouchableOpacity style={[styles.button, {width: 104, height: 38}]}
                        onPress={ () => this.props.onPayPress() }>
                        <Image source={require('../images/pay.png')}/>                
                        <Text style={[styles.buttonText, {color: Color.GREEN}]}>
                          Pay
                        </Text>
                      </TouchableOpacity>  
                      <TouchableOpacity style={[styles.button, {width: 104, height: 38, marginHorizontal: 4}]}
                        onPress={ () => this.props.onSendPress() }>
                        <Image source={require('../images/send.png')}/>
                        <Text style={[styles.buttonText, {color: Color.RED}]}>
                          Send
                        </Text>
                      </TouchableOpacity>                
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
    borderBottomColor: '#d9d9d9',
    borderBottomWidth: 1,
  },
  detailsButton: {
    justifyContent: 'center',    
    alignItems: 'flex-end',
    width: 80,        
    height: 48,     
  },
  button: {
    backgroundColor: '#ccdfe5', 
    borderRadius: 20, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',     
    paddingHorizontal: 4,      
    padding: 8,          
  },
  buttonText: {
    backgroundColor: 'transparent',
    fontSize: 16,
    paddingHorizontal: 4
  },
});




