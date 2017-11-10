import React, { Component } from 'react';
import { 
  StyleSheet, TextInput, Text, TouchableOpacity, View, Image, Picker, Button
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Navigation } from 'react-native-navigation';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from "react-redux";

import ConfirmScreen from './ConfirmScreen';
import color from '../common/colors';
import Voucher from '../common/voucher.constants';
import VoucherDetails from '../screens/VoucherDetails';
import { setHasVoucher } from "../actions/vouchersAction";

const ACTIVATE_BUTTON_DOUBLE_PRESS_FEATURE = true;
const DOUBLE_PRESS_DELAY = 300;

class BuyVoucher extends Component<{}> {

  constructor(props) {
    super(props);
    // if you want to listen on navigator events, set this up
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  
  state = {
    selectedValue: 5,
  };

  onNavigatorEvent(event) { 
    if (event.type === 'NavBarButtonPress' && event.id === 'buy'){
      this.navigateToConfirm();  
    }
    else if (event.type === 'DeepLink' && event.link === 'BuyVoucher.popToRoot') 
      this.props.navigator.popToRoot({ animationType: 'fade' });     
  }

  navigateToConfirm() {
    this.props.navigator.push({
      screen: 'ConfirmScreen',
      title: Voucher.BUY,
      backButtonTitle: 'Cancel',
      passProps: {confirmType: Voucher.BUY, amount: this.state.selectedValue},
    });
  }

  updateSelectedValue = (selectedValue) => {
    this.setState({ selectedValue: selectedValue });
  }

  onButtonPress = (amount) => {
    this.setState({ selectedValue: amount });

    // Button Double Press Feature  
    if(!ACTIVATE_BUTTON_DOUBLE_PRESS_FEATURE)
      return;

    const now = new Date().getTime();
    if (this.lastButtonPress && (now - this.lastButtonPress) < DOUBLE_PRESS_DELAY) 
      this.handleButtonDoublePress();    
    else 
      this.lastButtonPress = now;    
  }

  handleButtonDoublePress() {
    this.navigateToConfirm();   
    this.lastButtonPress = 0;          
  }
  
  render() {
    const buttonDir = require('../images/button.png');
    const buttonSelectedDir = require('../images/button-selected.png');

    const selectedButton = this.state.selectedValue;
    let button5style = styles.buttonText;    
    let button10style = styles.buttonText;    
    let button20style = styles.buttonText;    
    let button50style = styles.buttonText;    
    let button5 = buttonDir;        
    let button10 = buttonDir;        
    let button20 = buttonDir;    
    let button50 = buttonDir;    
    switch (selectedButton) {
      case 5:
        button5style = styles.buttonTextSelected;
        button5 = buttonSelectedDir;        
        break;      
      case 10:
        button10style = styles.buttonTextSelected;
        button10 = buttonSelectedDir;        
        break;
      case 20:
        button20style = styles.buttonTextSelected;
        button20 = buttonSelectedDir;        
        break;
      case 50:
        button50style = styles.buttonTextSelected;
        button50 = buttonSelectedDir;        
        break;        
      default:     
        break;
    }

    return (
      <View style={styles.container}>        
        <View style={styles.buttons}>  
          <View style={styles.buttonsRowOne}>   
            <TouchableOpacity 
              onPress={() => this.onButtonPress(5)}
              style={styles.button5}>                    
              <Image style={styles.imagestyle} source={button5}>
                <Text style={button5style}> 
                  $5
                </Text>              
              </Image>          
            </TouchableOpacity>             
            <TouchableOpacity 
              onPress={() => this.onButtonPress(20)}
              style={styles.button20}>        
              <Image style={styles.imagestyle} source={button20}>
                <Text style={button20style}> 
                  $20
                </Text>              
              </Image>          
            </TouchableOpacity>    
          </View>          
          <View style={styles.buttonsRowTwo}>   
            <TouchableOpacity 
              onPress={() => this.onButtonPress(10)}
              style={styles.button10}>                    
              <Image style={styles.imagestyle} source={button10}>
                <Text style={button10style}> 
                  $10
                </Text>              
              </Image>          
            </TouchableOpacity>   
            <TouchableOpacity 
              onPress={() => this.onButtonPress(50)}
              style={styles.button50}>                    
              <Image style={styles.imagestyle} source={button50}>
                <Text style={button50style}> 
                  $50
                </Text>              
              </Image>          
            </TouchableOpacity>   
          </View>                    
        </View>
        <View style={styles.pickerView}>
          <Text style={styles.pickerLabel}> 
            Value, $
          </Text>            
          <Picker 
            style={styles.picker} 
            itemStyle={{color: 'white', fontSize: 26}}
            selectedValue = {this.state.selectedValue} 
            onValueChange = {this.updateSelectedValue}>
            <Picker.Item label = "0.00" value = {0} />
            <Picker.Item label = "5.00" value = {5} />
            <Picker.Item label = "10.00" value = {10} />
            <Picker.Item label = "20.00" value = {20} />
            <Picker.Item label = "50.00" value = {50} />
            <Picker.Item label = "100.00" value = {100} />
          </Picker>              
        </View>

      </View>
    );

  }
}

const mapStateToProps = (state) => {
  return {
    hasVoucher: state.hasVoucher,    
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setHasVoucher: (state) => {
      dispatch(setHasVoucher(state));      
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyVoucher);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  buttons:{

  },
  buttonsRowOne: {
    alignItems: 'center',
    flexDirection:'row',
    marginLeft: 56,
    marginTop: 18,
  },
  buttonsRowTwo: {
    alignItems: 'center',
    flexDirection:'row',
    position: 'absolute', 
    top: 160, 
    left: 117, 
    right: 0, 
    bottom: 0, 
  },
  button5: {
    alignItems: 'center',
    justifyContent:'center',
    width: 82,
    height: 82,
    transform: [
		  {rotate: '45deg'}
		]    
  },
  button10: {
    alignItems: 'center',
    justifyContent:'center',
    width: 82,
    height: 82,
    transform: [
		  {rotate: '45deg'}
		]    
  },
  button20: {
    margin: 40,
    alignItems: 'center',
    justifyContent:'center',
    width: 82,
    height: 82,
    transform: [
		  {rotate: '45deg'}
		]    
  },
  button50: {
    margin: 40,
    alignItems: 'center',
    justifyContent:'center',
    width: 82,
    height: 82,
    transform: [
		  {rotate: '45deg'}
		]    
  },
  buttonText: {
    textAlign: 'center',
    backgroundColor: 'transparent',  
    color: 'white', 
    fontWeight: '700' 
  },
  buttonTextSelected: {
    textAlign: 'center',
    backgroundColor: 'transparent',  
    color: color.BLUE, 
    fontWeight: '700' 
  },
  imagestyle: {
    alignItems: 'center',
    justifyContent:'center',
    transform: [
		  {rotate: '-45deg'}
		]   
  },
  pickerView: {
    flexDirection: 'row', 
    marginTop: 100, 
    alignItems: 'center'
  },
  picker: {
    flex: 1,
    marginRight: 100,
  },
  pickerLabel: {
    color: color.GREY_TEXT, 
    fontSize: 16, 
    paddingLeft: 60,
  },
  buyButtonStyle: {
    marginRight: 20,
    backgroundColor: 'red',
  }
});