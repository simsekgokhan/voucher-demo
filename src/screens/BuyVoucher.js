import React, { Component } from 'react';
import { 
  StyleSheet, TextInput, Text, TouchableOpacity, View, Image
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Navigation } from 'react-native-navigation';
import LinearGradient from 'react-native-linear-gradient';
import ConfirmScreen from './ConfirmScreen';
import color from '../common/colors';

class BuyVoucher extends Component<{}> {

  constructor(props) {
    super(props);
    //console.warn('xx: ' + JSON.stringify(this.props, null, 4));    
    //this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  state = {
    selectedButton: 10,
  };

  onNavigatorEvent(event) {
    //console.warn('aaa');

    if (event.id == 'xxx') {
      //console.warn('bb');
    }
  }

  onButtonPress = (amount) => {
    this.setState({selectedButton: amount});
  }

  render() {

    const buttonDir = require('../images/button.png');
    const buttonSelectedDir = require('../images/button-selected.png');

    const selectedButton = this.state.selectedButton;
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
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    //alignItems: 'center',
    flex: 1,
    //justifyContent: 'center',
    backgroundColor: 'black',
  },
  buttons:{

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
    left: 120, 
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
  }
});

// const BuyVoucher = StackNavigator({
//   HomeScr: { 
//     screen: BuyVoucherScreen, 
//     navigationOptions: {
//       header: null,      
//     }
//   },
//   ConfirmScr: { 
//     screen: ConfirmScreen,
//     navigationOptions: {
//       headerStyle: {
//         backgroundColor: 'black',  
//       },
//       headerTitleStyle: {
//         color: 'white',
//       },
//       headerBackTitleStyle: {
//         color: color.BLUE,        
//       }
//     }
//   },
// });

export default BuyVoucher;





