import React, { Component } from 'react';
import { 
  StyleSheet, TextInput, Text, TouchableOpacity, View, Image, Picker, Button,
  Dimensions
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import LinearGradient from 'react-native-linear-gradient';

import ConfirmScreen from './ConfirmScreen';
import Color from '../common/colors';
import Voucher from '../common/voucher.constants';
import VoucherDetails from '../screens/VoucherDetails';

const ACTIVATE_BUTTON_DOUBLE_PRESS_FEATURE = true;
const DOUBLE_PRESS_DELAY = 300;

export default class BuyVoucher extends Component<{}> {

  constructor(props) {
    super(props);
    // Subscribe to navigator events  
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  
  state = { selectedValue: 20 };

  onNavigatorEvent(event) { 
    if (event.type === 'NavBarButtonPress' && event.id === 'buy')
      this.navigateToConfirm();    
    else if (event.type === 'DeepLink' && event.link === 'BuyVoucher.popToRoot')
      this.props.navigator.popToRoot({ animationType: 'fade' });        
    else if (event.id === 'bottomTabSelected')      
      this.props.navigator.handleDeepLink({
        link: 'AllTabs.popToRoot', 
        payload: { sender: 'BuyVoucher' }
      });           
    else if (event.type === 'DeepLink' && event.link === 'AllTabs.popToRoot' &&
             event.payload.sender !== 'BuyVoucher')
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

    // Button double press feature  
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
        <View>  
          <View style={styles.buttonsRowOne}>   
            <TouchableOpacity style={styles.button5}
              onPress={() => this.onButtonPress(5)}>                    
              <Image style={styles.imagestyle} source={button5}>
                <Text style={button5style}> 
                  $5
                </Text>              
              </Image>          
            </TouchableOpacity>             
            <TouchableOpacity style={styles.button20}
              onPress={() => this.onButtonPress(20)}>        
              <Image style={styles.imagestyle} source={button20}>
                <Text style={button20style}> 
                  $20
                </Text>              
              </Image>          
            </TouchableOpacity>    
          </View>          
          <View style={styles.buttonsRowTwo}>   
            <TouchableOpacity style={styles.button10}
              onPress={() => this.onButtonPress(10)}>                    
              <Image style={styles.imagestyle} source={button10}>
                <Text style={button10style}> 
                  $10
                </Text>              
              </Image>          
            </TouchableOpacity>   
            <TouchableOpacity style={styles.button50}
              onPress={() => this.onButtonPress(50)}>                    
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
          <Picker style={styles.picker} 
            itemStyle={{color: Color.TEXT_DEFAULT, fontSize: 26}}
            selectedValue = {this.state.selectedValue} 
            onValueChange = {this.updateSelectedValue}>
            <Picker.Item label = "5.00" value = {5} />
            <Picker.Item label = "10.00" value = {10} />
            <Picker.Item label = "20.00" value = {20} />
            <Picker.Item label = "50.00" value = {50} />
            <Picker.Item label = "100.00" value = {100} />
            <Picker.Item label = "200.00" value = {200} />
            <Picker.Item label = "500.00" value = {500} />
            <Picker.Item label = "1000.00" value = {1000} />
          </Picker>           
        </View>
        <View style={{backgroundColor: Color.WHITE, flex:1, 
                      width:Dimensions.get('window').width}}>
        </View>   
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BACKGROUND_BLUE
  },
  buttonsRowOne: {
    alignItems: 'center',
    flexDirection:'row',
    marginLeft: 58,
    marginTop: 18,
  },
  buttonsRowTwo: {
    alignItems: 'center',
    flexDirection:'row',
    position: 'absolute', 
    top: 160, 
    left: 116, 
    right: 0, 
    bottom: 0, 
  },
  button5: {
    backgroundColor: Color.WHITE,          
    alignItems: 'center',
    justifyContent:'center',
    width: 76,
    height: 76,
    transform: [
		  {rotate: '45deg'}
		]    
  },
  button10: {
    backgroundColor: Color.WHITE,          
    alignItems: 'center',
    justifyContent:'center',
    width: 76,
    height: 76,
    transform: [
		  {rotate: '45deg'}
		]    
  },
  button20: {
    backgroundColor: Color.WHITE,          
    margin: 40,
    alignItems: 'center',
    justifyContent:'center',
    width: 76,
    height: 76,
    transform: [
		  {rotate: '45deg'}
		]    
  },
  button50: {
    backgroundColor: Color.WHITE,          
    margin: 40,
    alignItems: 'center',
    justifyContent:'center',
    width: 76,
    height: 76,
    transform: [
		  {rotate: '45deg'}
		]    
  },
  buttonText: {
    textAlign: 'center',
    backgroundColor: Color.TRANSPARENT,  
    color: Color.TEXT_GREY_DARK, 
    fontSize: 24,
  },
  buttonTextSelected: {
    textAlign: 'center',
    backgroundColor: Color.TRANSPARENT,  
    color: Color.BLUE, 
    fontSize: 24,
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
    height: 260,
    alignItems: 'center',
    backgroundColor: Color.WHITE,          
  },
  picker: {
    flex: 1,
    padding: 30,
    marginRight: 100,
  },
  pickerLabel: {
    color: Color.TEXT_GREY_DARK, 
    fontSize: 18, 
    paddingLeft: 30,
  },
  buyButtonStyle: {
    marginRight: 20,
    backgroundColor: 'red',
  }
});