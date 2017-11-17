
import React, { Component } from 'react';
import { 
  StyleSheet, TextInput, Text, TouchableOpacity, View, Image, Dimensions,
  Button
} from 'react-native';
import Color from '../common/colors';

export default class HoldCard extends React.Component {

  constructor(props) {
    super(props);
    // if you want to listen on navigator events, set this up
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) { 
    if (event.type === 'NavBarButtonPress' && event.id === 'skip')
      this.onButtonPress(true);
  }

  static navigatorStyle = {
    tabBarHidden: true,     
    navBarTextColor: Color.WHITE,
    navBarButtonColor: Color.WHITE,        
  }

  onButtonPress = (showEmptyForm) => {
    this.props.navigator.push({
      screen: 'AddCard',
      title: 'Card Registration',
      backButtonTitle: 'Back',
      passProps: {showEmptyForm: showEmptyForm},
      navigatorButtons: {
        rightButtons: [{
          id: 'done',
          title: 'Done',
        }]
      }     
    });
  }

  render() {
    return (
      <Image resizeMode='cover' style={styles.container}  
        source={require('../images/hold-card.png')}>                         
        <TouchableOpacity 
          onPress={ () => this.onButtonPress(false) }
          style={styles.button}>                    
          <Image style={styles.leftRect} 
            source={require('../images/rect-left.png')}/>
          <Image style={styles.rightRect} 
          source={require('../images/rect-right.png')}/>   
          <Text style={styles.buttonText}> 
            Hold your credit card here
          </Text>      
        </TouchableOpacity>           
      </Image>        
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
    marginBottom: 60,
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
    top: 370, 
    left: 0, 
    right: 0, 
    bottom: 0,     
    backgroundColor: 'transparent',  
    color: 'white', 
    fontWeight: '700' 
  },
});
