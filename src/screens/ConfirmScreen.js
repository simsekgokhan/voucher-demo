import React, { Component } from 'react';
import { 
  StyleSheet, TextInput, Text, TouchableOpacity, View, Image
} from 'react-native';
import color from '../common/colors';
import Voucher from '../common/voucher.constants';
import VoucherDetails from '../screens/VoucherDetails';

let voucherType = '';

export default class ConfirmScreen extends Component<{}> {

  constructor(props) {
    super(props);    
  }

  static navigationOptions = ({ navigation })  => ({
    title: navigation.state.params.confirmType, // this is passed to child or comes from parent
    headerTintColor: color.BLUE,
  });

  onTouchIdPressed = () => {            
    const { navigate } = this.props.navigation;    
    navigate('VoucherDetails', {voucherType: voucherType});    
  }

  render() {
    const leftQuoMark = '\u00AB';
    const rightQuoMark = '\u00BB';
    
    const { params } = this.props.navigation.state;    
    const confirmType = params.confirmType;
    const amount = params.amount;

    let textColor = color.BLUE;
    switch(confirmType) {
      case Voucher.BUY:
        voucherType = Voucher.PURCHASED;
        textColor = color.BLUE;                
        break;      
      case Voucher.REDEEM:
        textColor = color.BLUE;
        break;
      case Voucher.SEND:
        textColor = color.RED;
        voucherType = Voucher.SENT;
        break;
      case Voucher.REFUND:
        textColor = color.PURPLE;
        voucherType = Voucher.REFUNDED;
        break;
      default:
        textColor = color.BLUE;
        break;
    }      
        
    return (
      <View style={styles.container}>
        <View style={styles.block}>
          <Text style={{color: 'white', fontSize: 18, marginTop: 50}}> 
            {confirmType} 
          </Text>
          <Text style={{color: textColor, fontSize: 24, marginTop: 4}}> 
            ${amount} 
          </Text>
          
          <TouchableOpacity onPress={this.onTouchIdPressed}>
          <Image                      
            style={{marginTop: 70}}
            source={require('../images/touchId-button.png')}/>
          </TouchableOpacity>

          <Text style={{color: 'white', fontSize: 18, marginTop: 30}}> 
            Touch ID for 
          </Text>          
          <Text style={{color: 'white', fontSize: 18, marginTop: 4}}> 
            {leftQuoMark}Blockchain Vouchers{rightQuoMark}
          </Text>
          <Text style={{color: 'white', fontSize: 14, marginTop: 14}}> 
            Please, confirm your fingerprint
          </Text>                    
        </View>        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  block: {
    flex: 1,
    marginHorizontal: 20, 
    marginVertical: 30, 
    alignItems: 'center',
    backgroundColor: color.GREY_BACKGROUND,
  }
});