
import React, { Component } from 'react';
import { 
  StyleSheet, TextInput, Text, TouchableOpacity, View, Image, Dimensions,
  Button
} from 'react-native';
import color from '../common/colors';

export default class CardRegister extends React.Component {

  constructor(props) {
    super(props);
    // if you want to listen on navigator events, set this up
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) { 
    if (event.type === 'NavBarButtonPress' && event.id === 'skip'){
      this.props.navigator.push({
        screen: 'AddCard',
        title: 'Card Registration',
        backButtonTitle: 'Back',
        passProps: {showEmptyForm: true},
        navigatorButtons: {
          rightButtons: [{
            id: 'done',
            icon: require('../images/done-button.png'),      
          }]
        }     
      });
    }
  }

  static navigatorStyle = {
    navBarTextColor: 'white',
    navBarButtonColor: color.BLUE,
    tabBarHidden: true,          
  }

  onButtonPress = () => {
    this.props.navigator.push({
      screen: 'HoldCard',
      title: 'Card Registration',
      backButtonTitle: 'Cancel',
      passProps: {showEmptyForm: true},      
      navigatorButtons: {
        rightButtons: [{
          id: 'skip',
          buttonColor: 'blue',
          icon: require('../images/skip-button.png'),      
        }]
      }     
    })
  }

  render() {

    return (
      <View style={styles.container}>        
        <TouchableOpacity 
          onPress={this.onButtonPress}
          style={styles.button}>                    
          <Image style={styles.leftRect} 
            source={require('../images/rect-left.png')}/>
          <Image style={styles.rightRect} 
          source={require('../images/rect-right.png')}/>   

          <Text style={styles.buttonText}> 
            It will be scanned automatically
          </Text>      

        </TouchableOpacity>           
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  button: {
    marginBottom: 40,
    marginHorizontal: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent:'space-between',
    flexDirection: 'row',
    flex: 1,
  },
  leftRect: {
    alignItems: 'center',
    justifyContent:'center',
  },
  buttonText: {
    height: 40,
    textAlign: 'center',
    position: 'absolute',     
    top: 276, 
    left: 0, 
    right: 0, 
    bottom: 0,     
    backgroundColor: 'transparent',  
    color: 'grey', 
    fontWeight: '700' 
  },
});
